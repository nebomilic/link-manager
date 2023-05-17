import { Component } from '@angular/core'
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
}
