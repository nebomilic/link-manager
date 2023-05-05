import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent {
    constructor(private _auth: AuthService) {}

    logOut() {
        this._auth.logOut()
    }
}
