import { Injectable } from '@angular/core'
import { catchError, mergeMap, Observable, of, shareReplay } from 'rxjs'
import { Collection, NewCollectionData } from 'src/app/types'
import { AuthService } from '../auth/auth.service'
import { SnackBarService } from '../../ui/snack-bar/snack-bar.service'
import { CollectionDataService } from '../../data/collection-data/collection-data.service'
import { FavoriteCollectionIds } from '../../data/types'

@Injectable({
    providedIn: 'root',
})

// TODO: make sure the service gets cleaned up on log out
export class CollectionService {
    private _publicCollections$!: Observable<Collection[]>
    private _myCollections$!: Observable<Collection[]>
    private _favoriteCollections$!: Observable<Collection[]>
    private _favoriteCollectionIds$!: Observable<FavoriteCollectionIds>
    private _currentCollection$!: Observable<Collection | null>

    constructor(
        private _authService: AuthService,
        private _collectionDataService: CollectionDataService,
        private _snackBarService: SnackBarService
    ) {}

    public getMyCollections(): Observable<Collection[]> {
        if (!this._myCollections$) {
            this._myCollections$ =
                this._collectionDataService.getCollectionsByAuthorId(
                    this._authService.getUserId()
                )
        }

        return this._myCollections$
    }

    public getFavoriteCollectionIds(): Observable<FavoriteCollectionIds> {
        if (!this._favoriteCollectionIds$) {
            this._favoriteCollectionIds$ =
                this._collectionDataService.getFavoriteCollectionIdsByAuthorId(
                    this._authService.getUserId()
                )
        }

        return this._favoriteCollectionIds$
    }

    public getFavoriteCollections(): Observable<Collection[]> {
        if (!this._favoriteCollections$) {
            this._favoriteCollections$ = this.getFavoriteCollectionIds().pipe(
                shareReplay({
                    bufferSize: 1,
                    refCount: true,
                }) as never,
                mergeMap((item: FavoriteCollectionIds) => {
                    return this._collectionDataService.getFavoriteCollectionsByFavoriteCollectionIds(
                        item
                    )
                }),
                catchError((e) => {
                    console.log('ERROR: can not get favorite collections ', e)
                    // this happens when the user has no favorite collections in firestore
                    // therefore item[0].collectionIds is null in mergeMap above
                    return of([])
                })
            ) as Observable<Collection[]>
        }

        return this._favoriteCollections$
    }

    public getPublicCollections(): Observable<Collection[]> {
        if (!this._publicCollections$) {
            this._publicCollections$ =
                this._collectionDataService.getPublicCollectionsByAuthorId(
                    this._authService.getUserId()
                )
        }

        return this._publicCollections$
    }

    getCollectionById(id: string): Observable<Collection | null> {
        this._currentCollection$ =
            this._collectionDataService.getCollectionById(id)
        return this._currentCollection$
    }

    async deleteCollection(id: string) {
        try {
            await this._collectionDataService.deleteCollectionById(id)
            this._snackBarService.showMessage('Collection deleted 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be deleted 😕'
            )
            console.log(e)
        }
    }

    async addNewCollection(newCollectionData: NewCollectionData) {
        try {
            await this._collectionDataService.addNewCollection(
                newCollectionData
            )
            this._snackBarService.showMessage('Collection added 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be added 😕'
            )
            console.log(e)
        }
    }

    async updateCollection(updatedCollection: Collection) {
        try {
            await this._collectionDataService.updateCollection(
                updatedCollection
            )
            this._snackBarService.showMessage('Collection updated 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be updated 😕'
            )
            console.log(e)
        }
    }

    async faveCollection(collectionId: string | undefined) {
        if (!collectionId) {
            this._snackBarService.showGenericErrorMessage()
            return
        }

        const authorId = this._authService.getUserId()

        if (!authorId) {
            this._snackBarService.showGenericErrorMessage()
            return
        }

        try {
            this._collectionDataService.faveCollection(collectionId, authorId)
            this._snackBarService.showMessage('Collection faved 🥰')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be faved 😵‍💫'
            )
        }
    }

    async unfaveCollection(collectionId: string | undefined) {
        if (!collectionId) {
            this._snackBarService.showGenericErrorMessage()
            return
        }

        const authorId = this._authService.getUserId()

        if (!authorId) {
            this._snackBarService.showGenericErrorMessage()
            return
        }

        try {
            this._collectionDataService.unfaveCollection(collectionId, authorId)
            this._snackBarService.showMessage('Collection unfaved 🥲')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be unfaved 😵‍💫'
            )
        }
    }
}
