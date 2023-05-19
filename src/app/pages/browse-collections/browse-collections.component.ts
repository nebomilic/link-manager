import { Component } from '@angular/core'
import { catchError, mergeMap, Observable, of } from 'rxjs'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'

@Component({
    selector: 'app-browse-collections',
    templateUrl: './browse-collections.component.html',
    styleUrls: ['./browse-collections.component.scss'],
})
export class BrowseCollectionsComponent {
    constructor(private _collectionService: CollectionService) {}

    get collections$() {
        return this._collectionService.getPublicCollections()
    }

    isFavorite(id: string | undefined): Observable<boolean> {
        if (!id) {
            return of(false)
        } else {
            return this._collectionService.getFavoriteCollectionIds().pipe(
                mergeMap((item) =>
                    item.collectionIds && item.collectionIds.length > 0
                        ? of(item.collectionIds.includes(id))
                        : of(false)
                ),
                catchError(() => of(false))
            )
        }
    }

    faveCollection(id: string | undefined) {
        this._collectionService.faveCollection(id)
    }

    unfaveCollection(id: string | undefined) {
        this._collectionService.unfaveCollection(id)
    }
}
