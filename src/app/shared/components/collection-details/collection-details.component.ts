import { Component, OnInit } from '@angular/core'
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
    editable = false
    goToLink = goToLink

    constructor(
        private _authService: AuthService,
        private _currentCollectionService: CurrentCollectionService
    ) {}

    ngOnInit(): void {
        this._currentCollectionService
            .getCurrentCollection()
            .subscribe((collection) => {
                this.selectedCollection = collection
                this.editable =
                    this.selectedCollection?.authorId ==
                    this._authService.getUserId()
            })
    }
}
