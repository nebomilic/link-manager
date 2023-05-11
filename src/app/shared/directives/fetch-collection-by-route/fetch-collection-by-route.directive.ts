import {
    Directive,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { Collection } from 'src/app/types'
import { CollectionService } from '../../services/collection/collection.service'
/**
 * Directive for selecting a collection from the route params
 * TODO: moving this functionality to a service could be a better solution
 */
@Directive({
    selector: '[appFetchCollectionByRoute]',
})
export class FetchCollectionByRouteDirective implements OnInit, OnDestroy {
    @Output() collectionFetched: EventEmitter<Collection> = new EventEmitter()
    private _destroy$ = new Subject<void>()

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _collectionService: CollectionService
    ) {}

    ngOnInit() {
        this._route.params
            .pipe(takeUntil(this._destroy$))
            .subscribe((params) => {
                const selectedCollectionId = params['id']
                if (selectedCollectionId) {
                    const selectedCollection =
                        this._collectionService.allCollections.find(
                            (collection) =>
                                collection.id === selectedCollectionId
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
        this._destroy$.next()
        this._destroy$.complete()
    }
}
