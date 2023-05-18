import { Component } from '@angular/core'
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

    faveCollection(id: string | undefined) {
        if (!id) {
            this._snackBarService.showMessage('Whoops, something went wrong 😕')
        } else {
            this._collectionService.faveCollection(id)
        }
    }
}
