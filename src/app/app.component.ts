import { Component } from '@angular/core'
import { AuthService } from './shared/services/features/auth/auth.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(public authService: AuthService) {}
    title = 'link-manager'
}
