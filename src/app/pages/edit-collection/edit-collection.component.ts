import { AfterViewInit, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss'],
})
export class EditCollectionComponent implements AfterViewInit {
    constructor(
        private _collectionService: CollectionService,
        private _router: Router
    ) {}

    selectedCollection: Collection | null = null

    editCollectionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false),
    })

    saveAttempt = false

    get title() {
        return this.editCollectionForm.get('title')
    }

    save() {
        this.saveAttempt = true
        if (this.editCollectionForm.valid && this.selectedCollection) {
            this._collectionService.updateCollection({
                ...this.selectedCollection,
                ...(this.editCollectionForm.value.title && {
                    title: this.editCollectionForm.value.title,
                }),
                ...(this.editCollectionForm.value.description && {
                    description: this.editCollectionForm.value.description,
                }),
                ...(this.editCollectionForm.value.public && {
                    public: this.editCollectionForm.value.public,
                }),
            })
            this._router.navigate([NavigationLink.MyCollections])
            // TODO: show success message
        }
    }

    ngAfterViewInit(): void {
        if (this.selectedCollection) {
            this.editCollectionForm.setValue({
                title: this.selectedCollection.title,
                description: this.selectedCollection.description,
                public: this.selectedCollection.public,
            })
        }
    }
}
