import { Component, OnInit } from '@angular/core'
import { NavigationLink } from 'src/app/const'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent implements OnInit {
    constructor(private _auth: AuthService) {}
    user: null | firebase.default.User = null
    navigationLinks = NavigationLink

    logOut() {
        this._auth.logOut()
    }

    async ngOnInit() {
        this.user = await this._auth.getUser()
    }
}
