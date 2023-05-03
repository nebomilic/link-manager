import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection.service'

@Component({
    selector: 'app-collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss'],
})
export class CollectionDetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private collectionService: CollectionService
    ) {}
    selectedCollection: Collection | null = null

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const selectedCollectionId = params['id']
            if (selectedCollectionId) {
                // TODO: this hack needs to be fixed asap, maybe through a service?
                const selectedCollection = this.collectionService
                    .getCollections()
                    .find(
                        (collection) => collection.id === selectedCollectionId
                    )
                if (selectedCollection) {
                    this.selectedCollection = selectedCollection
                    return
                }
            }
            this.selectedCollection = null
        })
    }

    // NOTE: Why no workie?
    // ngOnDestroy() {
    //     this.route.params.unsubscribe()
    // }
}
