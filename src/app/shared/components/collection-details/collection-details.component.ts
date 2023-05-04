import { Component } from '@angular/core'
import { Collection } from 'src/app/types'

@Component({
    selector: 'app-collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss'],
})
export class CollectionDetailsComponent {
    selectedCollection: Collection | null = null
}
