import { Component, OnInit } from '@angular/core'
import { User } from 'firebase/auth'
import { NavigationLink } from 'src/app/const'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-page-frame',
    templateUrl: './page-frame.component.html',
    styleUrls: ['./page-frame.component.scss'],
})
export class PageFrameComponent implements OnInit {
    constructor(private _authService: AuthService) {}
    user: null | User = null
    navigationLinks = NavigationLink

    logOut() {
        this._authService.logOut()
    }

    async ngOnInit() {
        this.user = this._authService.getUser()
    }
}
