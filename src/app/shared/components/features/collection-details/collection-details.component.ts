import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core'
import { Observable } from 'rxjs'
import { BreakpointService } from 'src/app/shared/services/ui/breakpoint/breakpoint.service'
import { Collection } from 'src/app/types'
import { CurrentCollectionService } from '../../../services/collection/utils/current-collection/current-collection.service'
import { goToLink } from '../../../utils'

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
        private _currentCollectionService: CurrentCollectionService,
        private _breakpointService: BreakpointService
    ) {}

    get isHandset$(): Observable<boolean> {
        return this._breakpointService.isHandset$
    }

    ngOnInit(): void {
        this._currentCollectionService
            .getCurrentCollection()
            .subscribe((collection) => {
                this.selectedCollection = collection
            })
    }
}
