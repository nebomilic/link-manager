import { Component } from '@angular/core'
import { mergeMap, Observable, of } from 'rxjs'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { SnackBarService } from 'src/app/shared/services/snack-bar-service/snack-bar.service'

@Component({
    selector: 'app-browse-collections',
    templateUrl: './browse-collections.component.html',
    styleUrls: ['./browse-collections.component.scss'],
})
export class BrowseCollectionsComponent {
    constructor(
        private _collectionService: CollectionService,
        private _snackBarService: SnackBarService
    ) {}

    get collections$() {
        return this._collectionService.getPublicCollections()
    }

    isFavorite(id: string | undefined): Observable<boolean> {
        if (!id) {
            return of(false)
        } else {
            return this._collectionService.getFavoriteCollectionIds().pipe(
                mergeMap((favoriteCollectionIdsArray) => {
                    if (
                        favoriteCollectionIdsArray &&
                        favoriteCollectionIdsArray[0] &&
                        favoriteCollectionIdsArray[0].collectionIds
                    ) {
                        return of(
                            favoriteCollectionIdsArray[0].collectionIds.includes(
                                id
                            )
                        )
                    }

                    return of(false)
                })
            )
        }
    }

    faveCollection(id: string | undefined) {
        if (!id) {
            this._snackBarService.showMessage('Whoops, something went wrong 😕')
        } else {
            this._collectionService.faveCollection(id)
        }
    }

    unfaveCollection(id: string | undefined) {
        if (!id) {
            this._snackBarService.showMessage('Whoops, something went wrong 😕')
        } else {
            this._collectionService.unfaveCollection(id)
        }
    }
}
