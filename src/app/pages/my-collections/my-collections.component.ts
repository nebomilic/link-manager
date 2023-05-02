import { Component } from '@angular/core'
import { MOCK_COLLECTIONS } from './mock'

@Component({
    selector: 'app-my-collections',
    templateUrl: './my-collections.component.html',
    styleUrls: ['./my-collections.component.scss'],
})
export class MyCollectionsComponent {
    myCollections = MOCK_COLLECTIONS
}
