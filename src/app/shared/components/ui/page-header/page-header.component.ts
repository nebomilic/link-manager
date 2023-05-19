import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { BreakpointService } from '../../../services/ui/breakpoint/breakpoint.service'

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
    constructor(private _breakpointService: BreakpointService) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }
}
