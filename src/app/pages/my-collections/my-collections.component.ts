import { Component } from '@angular/core'
import { NavigationLink } from 'src/app/const'

@Component({
    selector: 'app-my-collections',
    templateUrl: './my-collections.component.html',
    styleUrls: ['./my-collections.component.scss'],
})
export class MyCollectionsComponent {
    newCollectionLink = NavigationLink.NewCollection
}
