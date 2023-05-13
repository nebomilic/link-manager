import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Injectable, OnDestroy } from '@angular/core'
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
    private _destroy$ = new Subject<void>()
    public isHandset$: Observable<boolean> = new Observable()
    constructor(private _breakpointObserver: BreakpointObserver) {
        this.isHandset$ = this._breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(
                takeUntil(this._destroy$),
                map((result) => result.matches),
                shareReplay()
            )
    }

    ngOnDestroy() {
        this._destroy$.next()
        this._destroy$.complete()
    }
}
