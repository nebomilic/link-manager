import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DiscoverComponent } from './pages/discover/discover.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { DiscoveredCollectionsComponent } from './pages/discovered-collections/discovered-collections.component'
import { ActivityComponent } from './pages/activity/activity.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { PageFrameComponent } from './shared/components/page-frame/page-frame.component'

@NgModule({
    declarations: [
        AppComponent,
        DiscoverComponent,
        LoginComponent,
        MyCollectionsComponent,
        DiscoveredCollectionsComponent,
        ActivityComponent,
        SettingsComponent,
        PageFrameComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
