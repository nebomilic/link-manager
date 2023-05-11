import { AfterViewInit, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Collection } from 'src/app/types'
import { AuthService } from '../../services/auth/auth.service'
import { BreakpointService } from '../../services/ui/breakpoint.service'
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

    constructor(
        private _authService: AuthService,
        private _breakpointService: BreakpointService
    ) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }

    ngAfterViewInit(): void {
        if (
            this.selectedCollection?.authorId == this._authService.getUserId()
        ) {
            this.editable = true
        }
    }
}
