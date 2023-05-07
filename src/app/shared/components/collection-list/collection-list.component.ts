import { Component, Input } from '@angular/core'
import { CollectionService } from '../../services/collection/collection.service'

@Component({
    selector: 'app-collection-list[type]', // makes "type" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent {
    constructor(public collectionService: CollectionService) {}

    @Input() type: 'my' | 'discovered' = 'my'
    @Input() editable = false

    get collection$() {
        return this.type == 'my'
            ? this.collectionService.myCollection$
            : this.collectionService.myCollection$
    }

    promptDeleteCollection(id: string | undefined) {
        if (!id) {
            alert('Whoops, something went wrong. Please try again.')
        } else {
            if (
                confirm('Are you sure you want to delete this collection?') ==
                true
            ) {
                this.deleteCollection(id)
            }
        }
    }

    private deleteCollection(id: string) {
        this.collectionService.deleteCollection(id)
    }
}
