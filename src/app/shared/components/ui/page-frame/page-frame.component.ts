import { Component, OnDestroy, OnInit } from '@angular/core'
import { User } from 'firebase/auth'
import { Observable, Subject, takeUntil } from 'rxjs'
import { NavigationLink } from 'src/app/const'
import { AuthService } from '../../../services/features/auth/auth.service'
import { BreakpointService } from '../../../services/ui/breakpoint/breakpoint.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent implements OnInit, OnDestroy {
    user: null | User = null
    navigationLinks = NavigationLink
    isHandset = false
    private _destroy$ = new Subject<void>()

    constructor(
        private _authService: AuthService,
        private _breakpointService: BreakpointService
    ) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }

    logOut() {
        this._authService.logOut()
    }

    async ngOnInit() {
        this.user = this._authService.getUser()
        this._breakpointService.isHandset$
            .pipe(takeUntil(this._destroy$))
            .subscribe((isHandset) => {
                this.isHandset = isHandset
            })
    }

    ngOnDestroy() {
        this._destroy$.next()
        this._destroy$.complete()
    }
}
