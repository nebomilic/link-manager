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

    promptDeleteCollection(id: string | undefined) {
        if (!id) {
            alert('Whoops, something went wrong. Please try again.')
        } else {
            if (
                confirm('Are you sure you want to delete this collection?') ==
                true
            ) {
                this.deleteCollection(id)
            }
        }
    }

    private deleteCollection(id: string) {
        this._collectionService.deleteCollection(id)
    }
}
