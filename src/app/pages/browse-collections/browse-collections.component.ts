import { Component } from '@angular/core'
import { CollectionService } from 'src/app/shared/services/features/collection/collection.service'

@Component({
    selector: 'app-browse-collections',
    templateUrl: './browse-collections.component.html',
})
export class BrowseCollectionsComponent {
    constructor(private _collectionService: CollectionService) {}

    get collections$() {
        return this._collectionService.getPublicCollections()
    }
}
