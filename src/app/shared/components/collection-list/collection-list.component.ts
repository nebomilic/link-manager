import { Component, Input } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection/collection.service'

@Component({
    selector: 'app-collection-list[collections]', // makes "collections" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent {
    constructor(private _collectionService: CollectionService) {}

    @Input() collections: Observable<Collection[]> = of([])
    @Input() editable = false
    @Input() emptyDescription = ''
    @Input() emptyHint = ''

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
        this._collectionService.deleteCollection(id)
    }
}
