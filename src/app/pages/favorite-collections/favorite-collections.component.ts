import { Component } from '@angular/core'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { SnackBarService } from 'src/app/shared/services/snack-bar-service/snack-bar.service'

@Component({
    selector: 'app-favorite-collections',
    templateUrl: './favorite-collections.component.html',
    styleUrls: ['./favorite-collections.component.scss'],
})
export class FavoriteCollectionsComponent {
    constructor(
        private _collectionService: CollectionService,
        private _snackBarService: SnackBarService
    ) {}

    get collections$() {
        return this._collectionService.getFavoriteCollections()
    }

    unfaveCollection(id: string | undefined) {
        if (!id) {
            this._snackBarService.showMessage('Whoops, something went wrong 😕')
        } else {
            this._collectionService.unfaveCollection(id)
        }
    }
}
