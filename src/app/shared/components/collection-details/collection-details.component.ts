import { AfterViewInit, Component } from '@angular/core'
import { Collection } from 'src/app/types'
import { AuthService } from '../../services/auth/auth.service'
import { goToLink } from '../../utils'

@Component({
    selector: 'app-collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss'],
})
export class CollectionDetailsComponent implements AfterViewInit {
    selectedCollection: Collection | null = null
    editable = false
    goToLink = goToLink

    constructor(private _authService: AuthService) {}

    ngAfterViewInit(): void {
        if (
            this.selectedCollection?.authorId == this._authService.getUserId()
        ) {
            this.editable = true
        }
    }
}
