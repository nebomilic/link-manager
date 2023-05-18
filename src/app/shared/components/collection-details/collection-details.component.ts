import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core'
import { Collection } from 'src/app/types'
import { AuthService } from '../../services/auth/auth.service'
import { CurrentCollectionService } from '../../services/collection/utils/current-collection/current-collection.service'
import { goToLink } from '../../utils'

@Component({
    selector: 'app-collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss'],
    providers: [CurrentCollectionService],
})
export class CollectionDetailsComponent implements OnInit {
    selectedCollection: Collection | null = null
    goToLink = goToLink
    @ContentChild('action') action: TemplateRef<any> | undefined

    constructor(
        private _authService: AuthService,
        private _currentCollectionService: CurrentCollectionService
    ) {}

    ngOnInit(): void {
        this._currentCollectionService
            .getCurrentCollection()
            .subscribe((collection) => {
                this.selectedCollection = collection
            })
    }
}
