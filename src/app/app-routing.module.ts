import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ActivityComponent } from './pages/activity/activity.component'
import { DiscoverComponent } from './pages/discover/discover.component'
import { DiscoveredCollectionsComponent } from './pages/discovered-collections/discovered-collections.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { NewCollectionComponent } from './pages/new-collection/new-collection.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CollectionDetailsComponent } from './shared/components/collection-details/collection-details.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'discover', component: DiscoverComponent },
    {
        path: 'my-collections',
        component: MyCollectionsComponent,
    },
    {
        path: 'my-collections/:id',
        component: CollectionDetailsComponent,
    },
    {
        path: 'discovered-collections',
        component: DiscoveredCollectionsComponent,
    },
    {
        path: 'discovered-collections/:id',
        component: CollectionDetailsComponent,
    },
    { path: 'activity', component: ActivityComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'new-collection', component: NewCollectionComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
