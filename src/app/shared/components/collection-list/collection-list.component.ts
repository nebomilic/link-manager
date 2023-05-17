import { Component, ContentChild, Input, TemplateRef } from '@angular/core'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection/collection.service'

@Component({
    selector: 'app-collection-list[collections]', // makes "collections" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent {
    constructor(private _collectionService: CollectionService) {}

    @Input() collections: Collection[] | null = []
    @Input() editable = false
    @Input() emptyDescription = ''
    @Input() emptyHint = ''
    @ContentChild('actions') actions: TemplateRef<any> | undefined
}
