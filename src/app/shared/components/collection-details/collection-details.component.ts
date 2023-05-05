import { AfterViewInit, Component } from '@angular/core'
import { Collection } from 'src/app/types'
import { MOCK_USER_ID } from '../../services/collection/mock'

@Component({
    selector: 'app-collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss'],
})
export class CollectionDetailsComponent implements AfterViewInit {
    selectedCollection: Collection | null = null
    editable = false

    ngAfterViewInit(): void {
        if (this.selectedCollection?.authorId == MOCK_USER_ID) {
            this.editable = true
        }
    }
}
