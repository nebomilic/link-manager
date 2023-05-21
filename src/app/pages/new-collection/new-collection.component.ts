import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { CollectionFormComponent } from 'src/app/shared/components/features/collection-form/collection-form.component'
import { CollectionService } from 'src/app/shared/services/features/collection/collection.service'

@Component({
    selector: 'app-new-collection',
    templateUrl: './new-collection.component.html',
})
export class NewCollectionComponent {
    @ViewChild(CollectionFormComponent)
    private _collectionFormComponent!: CollectionFormComponent

    constructor(
        private _collectionService: CollectionService,
        private _router: Router
    ) {}

    save() {
        if (this._collectionFormComponent.collectionForm.valid) {
            this._collectionService.addNewCollection(
                this._collectionFormComponent.collectionForm.value
            )
            this._router.navigate([NavigationLink.MyCollections])
        }
    }
}
