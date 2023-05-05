import { Component } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private _auth: AuthService) {}

    logInWithGoogle() {
        this._auth.logInWithGoogle()
    }
}
