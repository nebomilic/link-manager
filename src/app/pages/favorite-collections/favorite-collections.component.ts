import { Component } from '@angular/core'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'

@Component({
    selector: 'app-favorite-collections',
    templateUrl: './favorite-collections.component.html',
    styleUrls: ['./favorite-collections.component.scss'],
})
export class FavoriteCollectionsComponent {
    constructor(private _collectionService: CollectionService) {}

    get collections$() {
        return this._collectionService.getFavoriteCollections()
    }
}
