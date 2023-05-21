import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { goToLink, isValidUrl } from 'src/app/shared/utils'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-collection-form',
    templateUrl: './collection-form.component.html',
    styleUrls: ['./collection-form.component.scss'],
})
export class CollectionFormComponent implements OnInit {
    @Output() handleSave: EventEmitter<
        Partial<{
            title: string | null
            description: string | null
            public: boolean | null
            links: string[] | null
        }>
    > = new EventEmitter()
    goToLink = goToLink
    show = false
    saveAttempt = false

    collectionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false),
        links: new FormControl(),
    })

    get title() {
        return this.collectionForm.get('title')
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
        this.collectionForm.patchValue({
            links: [
                ...(this.collectionForm.value.links
                    ? this.collectionForm.value.links
                    : []),
                newLink,
            ],
        })
    }

    deleteLink(linkToRemove: string) {
        this.collectionForm.patchValue({
            links: this.collectionForm.value.links.filter(
                (link: string) => link !== linkToRemove
            ),
        })
    }

    setFormValues(collection: Collection) {
        this.collectionForm.setValue({
            title: collection.title,
            description: collection.description,
            public: collection.public,
            links: collection.links,
        })
    }

    save() {
        this.saveAttempt = true
        if (this.collectionForm.valid && this.handleSave) {
            this.handleSave.emit(this.collectionForm.value)
        }
    }

    ngOnInit(): void {
        this.show = true
    }
}
