import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { NavigationLink } from 'src/app/const'
import { BreakpointService } from 'src/app/shared/services/ui/breakpoint/breakpoint.service'

@Component({
    selector: 'app-my-collections',
    templateUrl: './my-collections.component.html',
    styleUrls: ['./my-collections.component.scss'],
})
export class MyCollectionsComponent {
    newCollectionLink = NavigationLink.NewCollection

    constructor(private _breakpointService: BreakpointService) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }
}
