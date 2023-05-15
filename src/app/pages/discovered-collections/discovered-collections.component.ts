import { Component } from '@angular/core'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'

@Component({
    selector: 'app-discovered-collections',
    templateUrl: './discovered-collections.component.html',
    styleUrls: ['./discovered-collections.component.scss'],
})
export class DiscoveredCollectionsComponent {
    constructor(private _collectionService: CollectionService) {}

    get collections$() {
        return this._collectionService.getDiscoveredCollections()
    }
}
