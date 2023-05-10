import { Component, OnInit } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { User } from 'firebase/auth'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { NavigationLink } from 'src/app/const'
import { AuthService } from '../../services/auth/auth.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _breakpointObserver: BreakpointObserver
    ) {}
    user: null | User = null
    navigationLinks = NavigationLink
    isHandset$: Observable<boolean> = this._breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        )

    logOut() {
        this._authService.logOut()
    }

    async ngOnInit() {
        this.user = this._authService.getUser()
    }
}
