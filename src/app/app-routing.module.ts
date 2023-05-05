import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
    canActivate,
    redirectLoggedInTo,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { ActivityComponent } from './pages/activity/activity.component'
import { DiscoverComponent } from './pages/discover/discover.component'
import { DiscoveredCollectionsComponent } from './pages/discovered-collections/discovered-collections.component'
import { EditCollectionComponent } from './pages/edit-collection/edit-collection.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { NewCollectionComponent } from './pages/new-collection/new-collection.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CollectionDetailsComponent } from './shared/components/collection-details/collection-details.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToHome = () => redirectLoggedInTo(['my-collections'])

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectLoggedInToHome),
    },
    { path: 'discover', component: DiscoverComponent },
    {
        path: 'my-collections',
        component: MyCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: 'my-collections/:id',
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: 'my-collections/:id/edit',
        component: EditCollectionComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: 'discovered-collections',
        component: DiscoveredCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: 'discovered-collections/:id',
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
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
