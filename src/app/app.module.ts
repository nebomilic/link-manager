import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DiscoverComponent } from './pages/discover/discover.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { FavoriteCollectionsComponent } from './pages/favorite-collections/favorite-collections.component'
import { ActivityComponent } from './pages/activity/activity.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { PageFrameComponent } from './shared/components/page-frame/page-frame.component'
import { CollectionDetailsComponent } from './shared/components/collection-details/collection-details.component'
import { CollectionListComponent } from './shared/components/collection-list/collection-list.component'
import { NewCollectionComponent } from './pages/new-collection/new-collection.component'
import { ReactiveFormsModule } from '@angular/forms'
import { EditCollectionComponent } from './pages/edit-collection/edit-collection.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { InfoBannerComponent } from './shared/components/info-banner/info-banner/info-banner.component'
import { NoCollectionsStateComponent } from './shared/components/no-collections-state/no-collections-state.component'
import { BrowseCollectionsComponent } from './pages/browse-collections/browse-collections.component'
import { ResponsiveButtonComponent } from './shared/components/responsive-button/responsive-button.component'
import { LogoComponent } from './shared/components/logo/logo.component'
import { PageHeaderComponent } from './shared/components/page-header/page-header.component'

@NgModule({
    declarations: [
        AppComponent,
        DiscoverComponent,
        LoginComponent,
        MyCollectionsComponent,
        FavoriteCollectionsComponent,
        ActivityComponent,
        SettingsComponent,
        PageFrameComponent,
        CollectionDetailsComponent,
        CollectionListComponent,
        NewCollectionComponent,
        EditCollectionComponent,
        InfoBannerComponent,
        NoCollectionsStateComponent,
        BrowseCollectionsComponent,
        ResponsiveButtonComponent,
        LogoComponent,
        PageHeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
