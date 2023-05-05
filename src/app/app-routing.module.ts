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
import { NavigationLink } from './const'

const redirectUnauthorizedToLogin = () =>
    redirectUnauthorizedTo([NavigationLink.Login])
const redirectLoggedInToHome = () =>
    redirectLoggedInTo([NavigationLink.MyCollections])

const routes: Routes = [
    {
        path: NavigationLink.Login,
        component: LoginComponent,
        ...canActivate(redirectLoggedInToHome),
    },
    { path: 'discover', component: DiscoverComponent },
    {
        path: NavigationLink.MyCollections,
        component: MyCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.MyCollections}/:id`,
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.MyCollections}/:id/edit`,
        component: EditCollectionComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: NavigationLink.DiscoveredCollections,
        component: DiscoveredCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.DiscoveredCollections}/:id`,
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    { path: NavigationLink.Activity, component: ActivityComponent },
    { path: NavigationLink.Settings, component: SettingsComponent },
    { path: NavigationLink.NewCollection, component: NewCollectionComponent },
    { path: '', redirectTo: `/${NavigationLink.Login}`, pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
