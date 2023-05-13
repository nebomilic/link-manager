import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { concatMap, filter, from, map, mergeMap, shareReplay, tap } from 'rxjs'
import { CollectionService } from '../../collection.service'

/**
 * It needs to be provided in the component that uses it, by adding it to the providers array in the component:
 * 'providers: [CurrentCollectionService]',
 * The reason for that is that this service uses ActivatedRoute, which is not available in the root injector.
 */

@Injectable({
    providedIn: 'root',
})
export class CurrentCollectionService {
    constructor(
        private _route: ActivatedRoute,
        private _collectionService: CollectionService
    ) {}

    getCurrentCollection() {
        return this._route.params.pipe(
            shareReplay({
                bufferSize: 1,
                refCount: true,
            }),
            mergeMap((params) =>
                this._collectionService.getAllCollections().pipe(
                    concatMap((collections) => from(collections)),
                    filter((item) => item.id === params['id'])
                )
            )
        )
    }
}
