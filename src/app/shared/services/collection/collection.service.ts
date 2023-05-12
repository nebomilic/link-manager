import { Injectable, OnDestroy } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import {
    Firestore,
    collectionData,
    collection,
    where,
    query,
    limit,
    deleteDoc,
    updateDoc,
    orderBy,
    setDoc,
    doc,
} from '@angular/fire/firestore'
import {
    combineLatest,
    filter,
    map,
    mergeMap,
    Observable,
    shareReplay,
    Subject,
    takeUntil,
} from 'rxjs'
import {
    Collection,
    FirestoreTimestamp,
    NewCollectionData,
} from 'src/app/types'
import { AuthService } from '../auth/auth.service'
import { serverTimestamp } from '@firebase/firestore'
import { DBCollectionName } from 'src/app/const'

// TODO: implement pagination
const COLLECTIONS_PER_PAGE = 10

type DiscoveredCollectionIds = {
    authorId: string
    collectionIds: string[]
}

@Injectable({
    providedIn: 'root',
})

// TODO: make sure the service gets cleaned up on log out
export class CollectionService implements OnDestroy {
    private _destroy$ = new Subject<void>()
    private _myCollections$!: Observable<Collection[]>
    private _allCollections$!: Observable<Collection[]>
    private _discoveredCollections$!: Observable<Collection[]>
    collectionReference = collection(
        this._firestore,
        DBCollectionName.Collections
    )
    discoveredCollectionReference = collection(
        this._firestore,
        DBCollectionName.DiscoveredCollections
    )
    allCollections: Collection[] = []

    constructor(
        private _authService: AuthService,
        private _firestore: Firestore
    ) {}

    public getMyCollections(): Observable<Collection[]> {
        if (!this._myCollections$) {
            const myCollectionsQuery = query(
                this.collectionReference,
                where('authorId', '==', this._authService.getUserId()),
                orderBy('timestamp', 'desc'),
                limit(COLLECTIONS_PER_PAGE)
            )
            this._myCollections$ = collectionData(myCollectionsQuery).pipe(
                takeUntil(this._destroy$),
                shareReplay({ bufferSize: 1, refCount: true }) as never
            ) as Observable<Collection[]>
        }

        return this._myCollections$
    }

    public getDiscoveredCollections(): Observable<Collection[]> {
        if (!this._discoveredCollections$) {
            this._discoveredCollections$ = collectionData(
                query(
                    this.discoveredCollectionReference,
                    where('authorId', '==', this._authService.getUserId()),
                    limit(COLLECTIONS_PER_PAGE)
                )
            ).pipe(
                takeUntil(this._destroy$),
                shareReplay({ bufferSize: 1, refCount: true }) as never,
                filter(
                    (item: DiscoveredCollectionIds[]) =>
                        !!(item[0] && item[0].collectionIds)
                ),
                mergeMap((item: DiscoveredCollectionIds[]) =>
                    collectionData(
                        query(
                            this.collectionReference,
                            where('id', 'in', item[0].collectionIds),
                            orderBy('timestamp', 'desc'),
                            limit(COLLECTIONS_PER_PAGE)
                        )
                    )
                )
            ) as never
        }

        return this._discoveredCollections$
    }

    public getAllCollections(): Observable<Collection[]> {
        if (!this._allCollections$) {
            this._allCollections$ = combineLatest([
                this.getMyCollections(),
                this.getDiscoveredCollections(),
            ]).pipe(
                takeUntil(this._destroy$),
                shareReplay({ bufferSize: 1, refCount: true }),
                map(([myCollections, discoveredCollections]) => [
                    ...myCollections,
                    ...discoveredCollections,
                ])
            )
        }

        return this._allCollections$
    }

    async deleteCollection(id: string) {
        try {
            await deleteDoc(
                doc(this._firestore, DBCollectionName.Collections, id)
            )
        } catch (e) {
            console.log(e)
        }
    }

    async addNewCollection(newCollectionData: NewCollectionData) {
        const newCollection: Collection = {
            id: uuidv4(),
            title: newCollectionData.title || '',
            description: newCollectionData.description || '',
            public: newCollectionData.public || false,
            authorId: this._authService.getUserId() || '',
            views: 0,
            likes: 0,
            links: newCollectionData.links || [],
            timestamp: serverTimestamp() as FirestoreTimestamp,
        }
        try {
            await setDoc(
                doc(
                    this._firestore,
                    DBCollectionName.Collections,
                    newCollection.id
                ),
                <Collection>newCollection
            )
        } catch (e) {
            console.log(e)
        }
    }

    async updateCollection(updatedCollection: Collection) {
        try {
            const docRef = doc(
                this._firestore,
                DBCollectionName.Collections,
                updatedCollection.id
            )
            await updateDoc(docRef, <Collection>updatedCollection)
        } catch (e) {
            console.log(e)
        }
    }

    ngOnDestroy() {
        this._unsubscribe()
    }

    private _unsubscribe() {
        this._destroy$.next()
        this._destroy$.complete()
    }
}
