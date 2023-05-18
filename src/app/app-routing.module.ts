import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
    canActivate,
    redirectLoggedInTo,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { ActivityComponent } from './pages/activity/activity.component'
import { FavoriteCollectionsComponent } from './pages/favorite-collections/favorite-collections.component'
import { EditCollectionComponent } from './pages/edit-collection/edit-collection.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { NewCollectionComponent } from './pages/new-collection/new-collection.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CollectionDetailsComponent } from './shared/components/collection-details/collection-details.component'
import { NavigationLink } from './const'
import { BrowseCollectionsComponent } from './pages/browse-collections/browse-collections.component'
import { MyCollectionDetailsComponent } from './pages/my-collection-details/my-collection-details.component'

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
    {
        path: NavigationLink.MyCollections,
        component: MyCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: NavigationLink.Browse,
        component: BrowseCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.Browse}/:id`,
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.MyCollections}/:id/edit`,
        component: EditCollectionComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: NavigationLink.FavoriteCollections,
        component: FavoriteCollectionsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.FavoriteCollections}/:id`,
        component: CollectionDetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
    {
        path: `${NavigationLink.MyCollections}/:id`,
        component: MyCollectionDetailsComponent,
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
