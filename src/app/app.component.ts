import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

const privateRoutes = [
    '/my-collections',
    '/discovered-collections',
    '/activity',
    '/settings',
]
const isPrivateRoute = (route: string) => privateRoutes.includes(route)
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private router: Router) {}

    title = 'link-manager'
    isPrivateRoute = false

    ngOnInit() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.isPrivateRoute = isPrivateRoute(e.url)
            }
        })
    }
}
