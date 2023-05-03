import { Component, Input, OnChanges, SimpleChange } from '@angular/core'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection.service'

@Component({
    selector: 'app-collection-list[type]', // makes "type" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnChanges {
    constructor(private collectionService: CollectionService) {}

    @Input() type: 'my' | 'discovered' = 'my'
    collections: Collection[] = []

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['type']) {
            this.collections =
                this.type == 'my'
                    ? this.collectionService.getMyCollections()
                    : this.collectionService.getDiscoveredCollections()
        }
    }
}
