import { Component } from '@angular/core'
import { CollectionService } from 'src/app/shared/services/features/collection/collection.service'
import { SnackBarService } from 'src/app/shared/services/ui/snack-bar/snack-bar.service'

@Component({
    selector: 'app-favorite-collections',
    templateUrl: './favorite-collections.component.html',
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
            this._snackBarService.showGenericErrorMessage()
        } else {
            this._collectionService.unfaveCollection(id)
        }
    }
}
