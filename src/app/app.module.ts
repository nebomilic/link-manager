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
import { CollectionDetailsComponent } from './shared/components/collection-details/collection-details.component'
import { CollectionListComponent } from './shared/components/collection-list/collection-list.component'
import { NewCollectionComponent } from './pages/new-collection/new-collection.component'
import { ReactiveFormsModule } from '@angular/forms'

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
        CollectionDetailsComponent,
        CollectionListComponent,
        NewCollectionComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
