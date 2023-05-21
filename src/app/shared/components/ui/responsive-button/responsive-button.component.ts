import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { BreakpointService } from 'src/app/shared/services/ui/breakpoint/breakpoint.service'

@Component({
    selector: 'app-responsive-button',
    templateUrl: './responsive-button.component.html',
})
export class ResponsiveButtonComponent {
    @Input() link = ''
    @Input() icon = ''
    @Input() label = ''

    constructor(private _breakpointService: BreakpointService) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }
}
