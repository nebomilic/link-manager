import { Injectable, inject } from '@angular/core'
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
import { Observable, of } from 'rxjs'
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
    firestore: Firestore = inject(Firestore)
    auth: AuthService = inject(AuthService)
    myCollection$: Observable<Collection[]> = new Observable()
    discoveredCollection$: Observable<Collection[]> = new Observable()
    collectionReference = collection(
        this.firestore,
        DBCollectionName.Collections
    )
    discoveredCollectionReference = collection(
        this.firestore,
        DBCollectionName.DiscoveredCollections
    )
    collections: Collection[] = []

    constructor() {
        console.log('user id: ', this.auth.getUserId())
        const myCollectionsQuery = query(
            this.collectionReference,
            where('authorId', '==', this.auth.getUserId()),
            orderBy('timestamp', 'desc'),
            limit(COLLECTIONS_PER_PAGE)
        )
        this.myCollection$ = collectionData(myCollectionsQuery) as Observable<
            Collection[]
        >
        this.myCollection$.subscribe((collections) => {
            this.collections = collections
            console.log('my collections updated: ', collections)
        })

        const discoveredCollectionIdsQuery = query(
            this.discoveredCollectionReference,
            where('authorId', '==', this.auth.getUserId()),
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

            this.discoveredCollection$.subscribe((collections) => {
                this.collections = collections
                console.log('discovered collections updated: ', collections)
            })
        })
    }

    async deleteCollection(id: string) {
        try {
            await deleteDoc(
                doc(this.firestore, DBCollectionName.Collections, id)
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
            authorId: this.auth.getUserId() || '',
            views: 0,
            likes: 0,
            links: [],
            timestamp: serverTimestamp(),
        }
        try {
            await setDoc(
                doc(
                    this.firestore,
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
                this.firestore,
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
