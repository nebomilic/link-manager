import { Component } from '@angular/core'
import { NavigationLink } from 'src/app/const'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'

@Component({
    selector: 'app-my-collections',
    templateUrl: './my-collections.component.html',
    styleUrls: ['./my-collections.component.scss'],
})
export class MyCollectionsComponent {
    newCollectionLink = NavigationLink.NewCollection

    constructor(private _collectionService: CollectionService) {}

    get collections$() {
        return this._collectionService.getMyCollections()
    }
}
