import { Component, Input, OnChanges, SimpleChange } from '@angular/core'
import {
    MOCK_DISCOVERED_COLLECTIONS,
    MOCK_MY_COLLECTIONS,
} from 'src/app/pages/my-collections/mock'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-collection-list[type]', // makes "type" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnChanges {
    @Input() type: 'my' | 'discovered' = 'my'
    collections: Collection[] = []

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['type']) {
            this.collections =
                this.type == 'my'
                    ? MOCK_MY_COLLECTIONS
                    : MOCK_DISCOVERED_COLLECTIONS
        }
    }
}
