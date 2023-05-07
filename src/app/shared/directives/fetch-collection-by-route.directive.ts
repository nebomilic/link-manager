import {
    Directive,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Collection } from 'src/app/types'
import { CollectionService } from '../services/collection/collection.service'
/**
 * Directive for selecting a collection from the _route params
 */
@Directive({
    selector: '[appFetchCollectionByRoute]',
})
export class FetchCollectionByRouteDirective implements OnInit, OnDestroy {
    @Output() collectionFetched: EventEmitter<Collection> = new EventEmitter()
    private routeSub!: Subscription

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _collectionService: CollectionService
    ) {}

    ngOnInit() {
        this.routeSub = this._route.params.subscribe((params) => {
            const selectedCollectionId = params['id']
            if (selectedCollectionId) {
                const selectedCollection =
                    this._collectionService.collections.find(
                        (collection) => collection.id === selectedCollectionId
                    )
                if (!selectedCollection) {
                    this._router.navigate(['/'])
                } else {
                    this.collectionFetched.emit(selectedCollection)
                }
            }
        })
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe()
        }
    }
}
