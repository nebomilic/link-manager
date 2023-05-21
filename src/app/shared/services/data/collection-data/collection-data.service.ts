import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import {
    Firestore,
    FieldValue,
    collectionData,
    collection,
    where,
    query,
    deleteDoc,
    updateDoc,
    orderBy,
    setDoc,
    doc,
    arrayUnion,
    arrayRemove,
    getDoc,
} from '@angular/fire/firestore'
import { concatMap, from, map, Observable, shareReplay } from 'rxjs'
import {
    Collection,
    FirestoreTimestamp,
    NewCollectionData,
} from 'src/app/types'
import { serverTimestamp } from '@firebase/firestore'
import { AuthService } from '../../features/auth/auth.service'
import { DBCollectionName, FavoriteCollectionIds } from '../types'

@Injectable({
    providedIn: 'root',
})
export class CollectionDataService {
    private _collectionReference = collection(
        this._firestore,
        DBCollectionName.Collections
    )
    private _favoriteCollectionReference = collection(
        this._firestore,
        DBCollectionName.FavoriteCollections
    )

    constructor(
        private _authService: AuthService,
        private _firestore: Firestore
    ) {}

    public getCollectionsByAuthorId(
        authorId: string | undefined
    ): Observable<Collection[]> {
        const myCollectionsQuery = query(
            this._collectionReference,
            where('authorId', '==', authorId),
            orderBy('timestamp', 'desc')
        )
        return collectionData(myCollectionsQuery).pipe(
            shareReplay<Collection[]>({
                bufferSize: 1,
                refCount: true,
            }) as never
        ) as Observable<Collection[]>
    }

    public getFavoriteCollectionIdsByAuthorId(
        authorId: string | undefined
    ): Observable<FavoriteCollectionIds> {
        const favoriteCollectionIdsQuery = query(
            this._favoriteCollectionReference,
            where('authorId', '==', authorId)
        )

        return collectionData(favoriteCollectionIdsQuery).pipe(
            shareReplay({
                bufferSize: 1,
                refCount: true,
            }) as never,
            concatMap((item: never) => {
                return item
            })
        ) as Observable<FavoriteCollectionIds>
    }

    public getFavoriteCollectionsByFavoriteCollectionIds(
        item: FavoriteCollectionIds
    ): Observable<Collection[]> {
        const favoriteCollectionsQuery = query(
            this._collectionReference,
            where('id', 'in', item.collectionIds),
            where('public', '==', true),
            orderBy('timestamp', 'desc')
        )

        return collectionData(favoriteCollectionsQuery) as Observable<
            Collection[]
        >
    }

    public getPublicCollectionsByAuthorId(
        authorId: string | undefined
    ): Observable<Collection[]> {
        const publicCollectionsQuery = query(
            this._collectionReference,
            where('authorId', '!=', authorId),
            where('public', '==', true),
            orderBy('authorId', 'desc'),
            orderBy('timestamp', 'desc')
        )
        return collectionData(publicCollectionsQuery).pipe(
            shareReplay<Collection[]>({
                bufferSize: 1,
                refCount: true,
            }) as never
        ) as Observable<Collection[]>
    }

    getCollectionById(id: string): Observable<Collection | null> {
        return from(
            getDoc(doc(this._firestore, DBCollectionName.Collections, id))
        ).pipe(map((doc) => (doc.exists() ? (doc.data() as Collection) : null)))
    }

    async deleteCollectionById(id: string) {
        await deleteDoc(doc(this._firestore, DBCollectionName.Collections, id))
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

        await setDoc(
            doc(
                this._firestore,
                DBCollectionName.Collections,
                newCollection.id
            ),
            <Collection>newCollection
        )
    }

    async updateCollection(updatedCollection: Collection) {
        const docRef = doc(
            this._firestore,
            DBCollectionName.Collections,
            updatedCollection.id
        )
        await updateDoc(docRef, <Collection>updatedCollection)
    }

    private async _updateFavoriteCollectionIds(
        collectionIdsFieldValue: FieldValue,
        authorId: string
    ) {
        const ref = doc(
            this._firestore,
            DBCollectionName.FavoriteCollections,
            authorId
        )
        await setDoc(
            ref,
            {
                authorId: authorId,
                collectionIds: collectionIdsFieldValue,
            },
            { merge: true }
        )
    }

    async faveCollection(collectionId: string, authorId: string) {
        this._updateFavoriteCollectionIds(arrayUnion(collectionId), authorId)
    }

    async unfaveCollection(collectionId: string, authorId: string) {
        this._updateFavoriteCollectionIds(arrayRemove(collectionId), authorId)
    }
}
