import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { MyCollectionsComponent } from './pages/my-collections/my-collections.component'
import { FavoriteCollectionsComponent } from './pages/favorite-collections/favorite-collections.component'
import { PageFrameComponent } from './shared/components/ui/page-frame/page-frame.component'
import { CollectionDetailsComponent } from './shared/components/features/collection-details/collection-details.component'
import { CollectionListComponent } from './shared/components/features/collection-list/collection-list.component'
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { A11yModule } from '@angular/cdk/a11y'
import { InfoBannerComponent } from './shared/components/ui/info-banner/info-banner.component'
import { EmptyStateComponent } from './shared/components/empty-state/empty-state.component'
import { BrowseCollectionsComponent } from './pages/browse-collections/browse-collections.component'
import { ResponsiveButtonComponent } from './shared/components/ui/responsive-button/responsive-button.component'
import { LogoComponent } from './shared/components/ui/logo/logo.component'
import { PageHeaderComponent } from './shared/components/ui/page-header/page-header.component'
import { MyCollectionDetailsComponent } from './pages/my-collection-details/my-collection-details.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CollectionFormComponent } from './shared/components/features/collection-form/collection-form.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MyCollectionsComponent,
        FavoriteCollectionsComponent,
        PageFrameComponent,
        CollectionDetailsComponent,
        CollectionListComponent,
        NewCollectionComponent,
        EditCollectionComponent,
        InfoBannerComponent,
        EmptyStateComponent,
        BrowseCollectionsComponent,
        ResponsiveButtonComponent,
        LogoComponent,
        PageHeaderComponent,
        MyCollectionDetailsComponent,
        CollectionFormComponent,
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
        MatSnackBarModule,
        MatProgressSpinnerModule,
        A11yModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
