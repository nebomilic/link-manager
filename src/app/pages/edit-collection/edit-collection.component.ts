import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { CurrentCollectionService } from 'src/app/shared/services/collection/utils/current-collection/current-collection.service'
import { goToLink, isValidUrl } from 'src/app/shared/utils'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss'],
    providers: [CurrentCollectionService],
})
export class EditCollectionComponent implements OnInit {
    goToLink = goToLink
    constructor(
        private _router: Router,
        private _collectionService: CollectionService,
        private _currentCollectionService: CurrentCollectionService
    ) {}

    selectedCollection: Collection | null = null

    editCollectionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false),
        links: new FormControl(),
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
                ...(this.editCollectionForm.value.links && {
                    links: this.editCollectionForm.value.links,
                }),
            })
            this._router.navigate([NavigationLink.MyCollections])
            // TODO: show success message
        }
    }

    promptAddLink() {
        const newLink = prompt('Enter new link:', 'https://')
        if (newLink && isValidUrl(newLink)) {
            this._addLink(newLink)
        } else {
            alert('Please enter a valid link')
        }
    }

    private _addLink(newLink: string) {
        this.editCollectionForm.patchValue({
            links: [...this.editCollectionForm.value.links, newLink],
        })
    }

    deleteLink(linkToRemove: string) {
        this.editCollectionForm.patchValue({
            links: this.editCollectionForm.value.links.filter(
                (link: string) => link !== linkToRemove
            ),
        })
    }

    ngOnInit(): void {
        this._currentCollectionService
            .getCurrentCollection()
            .subscribe((collection) => {
                this.selectedCollection = collection
                if (this.selectedCollection) {
                    this.editCollectionForm.setValue({
                        title: this.selectedCollection.title,
                        description: this.selectedCollection.description,
                        public: this.selectedCollection.public,
                        links: this.selectedCollection.links,
                    })
                }
            })
    }
}
