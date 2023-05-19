import { Component, ContentChild, Input, TemplateRef } from '@angular/core'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-collection-list[collections]', // makes "collections" mandatory
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent {
    @Input() collections: Collection[] | null = []
    @Input() emptyDescription = ''
    @Input() emptyHint = ''
    @ContentChild('actions') actions: TemplateRef<never> | undefined
}
