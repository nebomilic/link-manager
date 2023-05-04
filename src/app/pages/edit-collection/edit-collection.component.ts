import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CollectionService } from 'src/app/shared/services/collection.service'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss'],
})
export class EditCollectionComponent implements OnInit {
    constructor(
        private _collectionService: CollectionService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {}

    private _selectedCollection: Collection | null = null

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
        if (this.editCollectionForm.valid && this._selectedCollection) {
            this._collectionService.updateCollection({
                ...this._selectedCollection,
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
            this._router.navigate(['/my-collections'])
            // TODO: show success message
        }
    }

    ngOnInit() {
        this._route.params.subscribe((params) => {
            const selectedCollectionId = params['id']
            if (selectedCollectionId) {
                const selectedCollection =
                    this._collectionService.collections.find(
                        (collection) => collection.id === selectedCollectionId
                    )
                if (selectedCollection) {
                    this._selectedCollection = selectedCollection
                    this.editCollectionForm.setValue({
                        title: selectedCollection.title,
                        description: selectedCollection.description,
                        public: selectedCollection.public,
                    })
                    return
                }
            }
            this._selectedCollection = null
        })
    }
}
