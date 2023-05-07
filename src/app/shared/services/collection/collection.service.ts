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
import { Observable } from 'rxjs'
import { Collection, NewCollectionData } from 'src/app/types'
import { AuthService } from '../auth.service'
import { serverTimestamp } from '@firebase/firestore'
import { DBCollectionName } from 'src/app/const'

// TODO: implement pagination
const COLLECTIONS_PER_PAGE = 10

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    collections: Collection[] = []
    myCollection$: Observable<Collection[]>
    // discoveredCollection$: Observable<DocumentData[]>
    // TODO: get ids from discovered_collections
    firestore: Firestore = inject(Firestore)
    auth: AuthService = inject(AuthService)
    collectionReference = collection(
        this.firestore,
        DBCollectionName.Collections
    )

    constructor() {
        console.log('user id: ', this.auth.getUserId())
        this.collectionReference = collection(
            this.firestore,
            DBCollectionName.Collections
        )
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
            console.log('Collections updated: ', collections)
        })

        // const discoveredCollectionsQuery = query()
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
