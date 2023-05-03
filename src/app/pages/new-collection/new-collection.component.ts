import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-new-collection',
    templateUrl: './new-collection.component.html',
    styleUrls: ['./new-collection.component.scss'],
})
export class NewCollectionComponent implements OnInit {
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
        // if (this.newCollectionForm.valid) {
        this.preview = JSON.stringify(this.newCollectionForm.value)
        console.log(this.preview)
        // }
    }

    ngOnInit(): void {
        //     if (this.newCollectionControl.get('title')) {
        //         this.newCollectionControl
        //             .get('title')
        //             .valueChanges.subscribe((value) => {
        //                 console.log(value)
        //             })
        //     }
    }
}
