import { Component, Input } from '@angular/core'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection.service'

@Component({
    selector: 'app-collection-list[type]', // makes "type" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent {
    constructor(public collectionService: CollectionService) {}

    @Input() type: 'my' | 'discovered' = 'my'
    @Input() editable = false
    collections: Collection[] = []

    getCollections() {
        this.collections =
            this.type == 'my'
                ? this.collectionService.collections.filter(
                      (collection) => collection.authorId === '1'
                  )
                : this.collectionService.collections.filter(
                      (collection) => collection.authorId !== '1'
                  )
    }

    deleteCollection(id: string) {
        this.collectionService.deleteCollection(id)
    }
}
