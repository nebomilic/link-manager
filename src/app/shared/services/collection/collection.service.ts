import { Injectable, OnDestroy } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import {
    Firestore,
    FieldValue,
    collectionData,
    collection,
    where,
    query,
    limit,
    deleteDoc,
    updateDoc,
    orderBy,
    setDoc,
    doc,
    arrayUnion,
    arrayRemove,
} from '@angular/fire/firestore'
import {
    catchError,
    combineLatest,
    map,
    mergeMap,
    Observable,
    of,
    shareReplay,
    Subject,
    takeUntil,
} from 'rxjs'
import {
    Collection,
    FirestoreTimestamp,
    NewCollectionData,
} from 'src/app/types'
import { AuthService } from '../auth/auth.service'
import { serverTimestamp } from '@firebase/firestore'
import { DBCollectionName } from 'src/app/const'
import { SnackBarService } from '../snack-bar-service/snack-bar.service'

// TODO: implement pagination
const COLLECTIONS_PER_PAGE = 10

type FavoriteCollectionIds = {
    authorId: string
    collectionIds: string[]
}

@Injectable({
    providedIn: 'root',
})

// TODO: make sure the service gets cleaned up on log out
export class CollectionService implements OnDestroy {
    private _destroy$ = new Subject<void>()
    private _myPublicCollections$!: Observable<Collection[]>
    private _myCollections$!: Observable<Collection[]>
    private _allCollections$!: Observable<Collection[]>
    private _favoriteCollections$!: Observable<Collection[]>
    private _favoriteCollectionIds: string[] = []
    private _collectionReference = collection(
        this._firestore,
        DBCollectionName.Collections
    )
    private _favoriteCollectionReference = collection(
        this._firestore,
        DBCollectionName.FavoriteCollections
    )

    constructor(
        private _authService: AuthService,
        private _firestore: Firestore,
        private _snackBarService: SnackBarService
    ) {}

    public getMyCollections(): Observable<Collection[]> {
        if (!this._myCollections$) {
            const myCollectionsQuery = query(
                this._collectionReference,
                where('authorId', '==', this._authService.getUserId()),
                orderBy('timestamp', 'desc'),
                limit(COLLECTIONS_PER_PAGE)
            )
            this._myCollections$ = collectionData(myCollectionsQuery).pipe(
                takeUntil(this._destroy$) as never,
                shareReplay<Collection[]>({
                    bufferSize: 1,
                    refCount: true,
                })
            ) as Observable<Collection[]>
        }

        return this._myCollections$
    }

    public getFavoriteCollections(): Observable<Collection[]> {
        if (!this._favoriteCollections$) {
            const favoriteCollectionIdsQuery = query(
                this._favoriteCollectionReference,
                where('authorId', '==', this._authService.getUserId()),
                limit(COLLECTIONS_PER_PAGE)
            )

            this._favoriteCollections$ = collectionData(
                favoriteCollectionIdsQuery
            ).pipe(
                takeUntil(this._destroy$),
                shareReplay({
                    bufferSize: 1,
                    refCount: true,
                }) as never,
                mergeMap((item: FavoriteCollectionIds[]) => {
                    this._favoriteCollectionIds = item[0].collectionIds
                    const favoriteCollectionsQuery = query(
                        this._collectionReference,
                        where('id', 'in', this._favoriteCollectionIds),
                        where('public', '==', true),
                        orderBy('timestamp', 'desc'),
                        limit(COLLECTIONS_PER_PAGE)
                    )

                    return collectionData(
                        favoriteCollectionsQuery
                    ) as Observable<Collection[]>
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
        if (!this._myPublicCollections$) {
            const publicCollectionsQuery = query(
                this._collectionReference,
                where('authorId', '!=', this._authService.getUserId()),
                where('public', '==', true),
                orderBy('authorId', 'desc'),
                orderBy('timestamp', 'desc'),
                limit(COLLECTIONS_PER_PAGE)
            )
            this._myPublicCollections$ = collectionData(
                publicCollectionsQuery
            ).pipe(
                takeUntil(this._destroy$) as never,
                shareReplay<Collection[]>({
                    bufferSize: 1,
                    refCount: true,
                })
            ) as Observable<Collection[]>
        }

        return this._myPublicCollections$
    }

    public getAllCollections(): Observable<Collection[]> {
        if (!this._allCollections$) {
            this._allCollections$ = combineLatest([
                this.getMyCollections(),
                this.getFavoriteCollections(),
                this.getPublicCollections(),
            ]).pipe(
                takeUntil(this._destroy$),
                shareReplay({ bufferSize: 1, refCount: true }),
                map(
                    ([
                        myCollections,
                        favoriteCollections,
                        publicCollections,
                    ]) => [
                        ...myCollections,
                        ...favoriteCollections,
                        ...publicCollections,
                    ]
                )
            )
        }

        return this._allCollections$
    }

    async deleteCollection(id: string) {
        try {
            await deleteDoc(
                doc(this._firestore, DBCollectionName.Collections, id)
            )

            this._snackBarService.showMessage('Collection deleted 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be deleted 😕'
            )
            console.log(e)
        }
    }

    async addNewCollection(newCollectionData: NewCollectionData) {
        const newCollection: Collection = {
            id: uuidv4(),
            title: newCollectionData.title || '',
            description: newCollectionData.description || '',
            public: newCollectionData.public || false,
            authorId: this._authService.getUserId() || '',
            views: 0,
            likes: 0,
            links: newCollectionData.links || [],
            timestamp: serverTimestamp() as FirestoreTimestamp,
        }
        try {
            await setDoc(
                doc(
                    this._firestore,
                    DBCollectionName.Collections,
                    newCollection.id
                ),
                <Collection>newCollection
            )

            this._snackBarService.showMessage('Collection added 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be deleted 😕'
            )
            console.log(e)
        }
    }

    async updateCollection(updatedCollection: Collection) {
        try {
            const docRef = doc(
                this._firestore,
                DBCollectionName.Collections,
                updatedCollection.id
            )
            await updateDoc(docRef, <Collection>updatedCollection)
            this._snackBarService.showMessage('Collection updated 👍')
        } catch (e) {
            this._snackBarService.showMessage(
                'Collection could not be updated 😕'
            )
            console.log(e)
        }
    }

    async faveCollection(collectionId: string) {
        this._updateFavoriteCollectionIds(
            arrayUnion(collectionId),
            'Collection faved 🥰',
            'Collection could not be faved 😵‍💫'
        )
    }

    async unfaveCollection(collectionId: string) {
        this._updateFavoriteCollectionIds(
            arrayRemove(collectionId),
            'Collection unfaved 🥲',
            'Collection could not be unfaved 😵‍💫'
        )
    }

    private async _updateFavoriteCollectionIds(
        collectionIdsFieldValue: FieldValue,
        successMessage: string,
        failMessage: string
    ) {
        const ref = doc(
            this._firestore,
            DBCollectionName.FavoriteCollections,
            this._authService.getUserId() || ''
        )
        try {
            await setDoc(
                ref,
                {
                    authorId: this._authService.getUserId(),
                    collectionIds: collectionIdsFieldValue,
                },
                { merge: true }
            )
            this._snackBarService.showMessage(successMessage)
        } catch (error) {
            this._snackBarService.showMessage(failMessage)
        }
    }

    ngOnDestroy() {
        this._destroy$.next()
        this._destroy$.complete()
    }
}
