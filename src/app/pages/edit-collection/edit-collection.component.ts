import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { CollectionFormComponent } from 'src/app/shared/components/features/collection-form/collection-form.component'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { CurrentCollectionService } from 'src/app/shared/services/collection/utils/current-collection/current-collection.service'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    providers: [CurrentCollectionService],
})
export class EditCollectionComponent implements AfterViewInit {
    @ViewChild(CollectionFormComponent)
    private _collectionFormComponent!: CollectionFormComponent
    private _selectedCollection: Collection | null = null
    constructor(
        private _router: Router,
        private _collectionService: CollectionService,
        private _currentCollectionService: CurrentCollectionService
    ) {}

    save() {
        if (
            this._collectionFormComponent.collectionForm &&
            this._selectedCollection
        ) {
            this._collectionService.updateCollection({
                ...this._selectedCollection,
                ...(this._collectionFormComponent.collectionForm.value
                    .title && {
                    title: this._collectionFormComponent.collectionForm.value
                        .title,
                }),
                ...(this._collectionFormComponent.collectionForm.value
                    .description && {
                    description:
                        this._collectionFormComponent.collectionForm.value
                            .description,
                }),
                ...(this._collectionFormComponent.collectionForm.value
                    .public !== undefined && {
                    public: this._collectionFormComponent.collectionForm.value
                        .public,
                }),
                ...(this._collectionFormComponent.collectionForm.value
                    .links && {
                    links: this._collectionFormComponent.collectionForm.value
                        .links,
                }),
            })
            this._router.navigate([NavigationLink.MyCollections])
        }
    }

    ngAfterViewInit(): void {
        this._currentCollectionService
            .getCurrentCollection()
            .subscribe((collection) => {
                this._selectedCollection = collection
                if (this._selectedCollection && this._collectionFormComponent) {
                    this._collectionFormComponent.setFormValues(
                        this._selectedCollection
                    )
                }
            })
    }
}
