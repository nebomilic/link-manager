import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { CollectionService } from 'src/app/shared/services/collection/collection.service'
import { goToLink, isValidUrl } from 'src/app/shared/utils'

@Component({
    selector: 'app-new-collection',
    templateUrl: './new-collection.component.html',
    styleUrls: ['./new-collection.component.scss'],
})
export class NewCollectionComponent implements OnInit {
    goToLink = goToLink
    show = false
    constructor(
        private _collectionService: CollectionService,
        private _router: Router
    ) {}

    newCollectionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false),
        links: new FormControl(),
    })

    saveAttempt = false

    get title() {
        return this.newCollectionForm.get('title')
    }

    promptAddLink() {
        const newLink = prompt('Enter new link:', 'https://')
        if (newLink && isValidUrl(newLink)) {
            this.addLink(newLink)
        } else {
            alert('Please enter a valid link')
        }
    }

    private addLink(newLink: string) {
        this.newCollectionForm.patchValue({
            links: [
                ...(this.newCollectionForm.value.links
                    ? this.newCollectionForm.value.links
                    : []),
                newLink,
            ],
        })
    }

    deleteLink(linkToRemove: string) {
        this.newCollectionForm.patchValue({
            links: this.newCollectionForm.value.links.filter(
                (link: string) => link !== linkToRemove
            ),
        })
    }

    save() {
        this.saveAttempt = true
        if (this.newCollectionForm.valid) {
            this._collectionService.addNewCollection(
                this.newCollectionForm.value
            )
            this._router.navigate([NavigationLink.MyCollections])
        }
    }

    ngOnInit(): void {
        this.show = true
    }
}
