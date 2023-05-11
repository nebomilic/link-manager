import { Component, OnInit } from '@angular/core'
import { User } from 'firebase/auth'
import { Observable } from 'rxjs'
import { NavigationLink } from 'src/app/const'
import { AuthService } from '../../services/auth/auth.service'
import { BreakpointService } from '../../services/ui/breakpoint.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _breakpointService: BreakpointService
    ) {}
    user: null | User = null
    navigationLinks = NavigationLink

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }

    logOut() {
        this._authService.logOut()
    }

    async ngOnInit() {
        this.user = this._authService.getUser()
    }
}
