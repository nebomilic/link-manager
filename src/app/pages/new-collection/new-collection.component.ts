import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CollectionService } from 'src/app/shared/services/collection.service'

@Component({
    selector: 'app-new-collection',
    templateUrl: './new-collection.component.html',
    styleUrls: ['./new-collection.component.scss'],
})
export class NewCollectionComponent {
    constructor(
        private _collectionService: CollectionService,
        private _router: Router
    ) {}

    newCollectionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false),
    })

    saveAttempt = false
    preview = ''

    get title() {
        return this.newCollectionForm.get('title')
    }

    save() {
        this.saveAttempt = true
        if (this.newCollectionForm.valid) {
            this._collectionService.addNewCollection(
                this.newCollectionForm.value
            )
            this._router.navigate(['/my-collections'])
            // TODO: show success message
        }
    }
}
