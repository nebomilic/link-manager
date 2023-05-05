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
 * Directive for selecting a collection from the route params
 */
@Directive({
    selector: '[appFetchCollectionByRoute]',
})
export class FetchCollectionByRouteDirective implements OnInit, OnDestroy {
    @Output() collectionFetched: EventEmitter<Collection> = new EventEmitter()
    private routeSub!: Subscription

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: CollectionService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            const selectedCollectionId = params['id']
            if (selectedCollectionId) {
                const selectedCollection =
                    this.collectionService.collections.find(
                        (collection) => collection.id === selectedCollectionId
                    )
                if (!selectedCollection) {
                    this.router.navigate(['/'])
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
