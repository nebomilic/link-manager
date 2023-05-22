import { Component, Input, OnInit } from '@angular/core'
import { catchError, mergeMap, Observable, of } from 'rxjs'
import { CollectionService } from 'src/app/shared/services/features/collection/collection.service'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-fave-button[collection]',
    templateUrl: './fave-button.component.html',
})
export class FaveButtonComponent implements OnInit {
    @Input() collection!: Collection
    isFavorite!: Observable<boolean>

    constructor(private _collectionService: CollectionService) {}

    private _calculateIsFavorite(id: string | undefined): Observable<boolean> {
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

    ngOnInit(): void {
        this.isFavorite = this._calculateIsFavorite(this.collection.id)
    }

    faveCollection(id: string | undefined) {
        this._collectionService.faveCollection(id)
    }

    unfaveCollection(id: string | undefined) {
        this._collectionService.unfaveCollection(id)
    }
}
