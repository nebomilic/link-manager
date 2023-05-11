import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'
import { map, Observable, shareReplay } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BreakpointService {
    public isHandset$: Observable<boolean> = new Observable()
    constructor(private _breakpointObserver: BreakpointObserver) {
        this.isHandset$ = this._breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(
                map((result) => result.matches),
                shareReplay()
            )
    }
}
