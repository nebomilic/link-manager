import { Injectable } from '@angular/core'
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
import { combineLatest, map, Observable } from 'rxjs'
import { Collection, NewCollectionData } from 'src/app/types'
import { AuthService } from '../auth.service'
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
export class CollectionService {
    myCollection$: Observable<Collection[]> = new Observable()
    discoveredCollection$: Observable<Collection[]> = new Observable()
    collectionReference = collection(
        this._firestore,
        DBCollectionName.Collections
    )
    discoveredCollectionReference = collection(
        this._firestore,
        DBCollectionName.DiscoveredCollections
    )
    allCollections: Collection[] = []

    constructor(private _auth: AuthService, private _firestore: Firestore) {
        _auth.loggedIn$.subscribe((loggedIn) => {
            if (loggedIn) {
                this._initialize()
            }
        })
    }

    private _initialize() {
        console.log('user id: ', this._auth.getUserId())
        const myCollectionsQuery = query(
            this.collectionReference,
            where('authorId', '==', this._auth.getUserId()),
            orderBy('timestamp', 'desc'),
            limit(COLLECTIONS_PER_PAGE)
        )
        this.myCollection$ = collectionData(myCollectionsQuery) as Observable<
            Collection[]
        >

        const discoveredCollectionIdsQuery = query(
            this.discoveredCollectionReference,
            where('authorId', '==', this._auth.getUserId()),
            limit(COLLECTIONS_PER_PAGE)
        )

        const discoveredCollectionId$ = collectionData(
            discoveredCollectionIdsQuery
        ) as Observable<DiscoveredCollectionIds[]>

        discoveredCollectionId$.subscribe((item) => {
            console.log('discovered collections: ', item)
            const collectionIds = item ? item[0].collectionIds : []
            const discoveredCollectionsQuery = query(
                this.collectionReference,
                where('id', 'in', collectionIds),
                orderBy('timestamp', 'desc'),
                limit(COLLECTIONS_PER_PAGE)
            )

            this.discoveredCollection$ = collectionData(
                discoveredCollectionsQuery
            ) as Observable<Collection[]>

            // We need allCollections's latest value only for collection detail view
            // We get the selectedCollection from the allCollections array instad of hitting the database again
            const allCollection$ = combineLatest([
                this.myCollection$,
                this.discoveredCollection$,
            ]).pipe(
                map(([myCollections, discoveredCollections]) => [
                    ...myCollections,
                    ...discoveredCollections,
                ])
            )
            allCollection$.subscribe((allCollection) => {
                this.allCollections = allCollection
            })
        })
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
            authorId: this._auth.getUserId() || '',
            views: 0,
            likes: 0,
            links: [],
            timestamp: serverTimestamp(),
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
            console.log('doc updated with id: ', docRef.id)
        } catch (e) {
            console.log(e)
        }
    }
}
