import { Injectable } from '@angular/core'
import { MOCK_COLLECTIONS, MOCK_USER_ID } from './mock'
import { Collection, NewCollectionData } from 'src/app/types'

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    private _collections: Collection[] = MOCK_COLLECTIONS

    get collections(): Collection[] {
        return this._collections
    }

    get myCollections(): Collection[] {
        return this._collections.filter(
            (collection) => collection.authorId === MOCK_USER_ID
        )
    }

    get discoveredCollections(): Collection[] {
        return this._collections.filter(
            (collection) => collection.authorId !== MOCK_USER_ID
        )
    }

    deleteCollection(id: string) {
        this._collections = this._collections.filter(
            (collection) => collection.id !== id
        )
    }

    addNewCollection(newCollectionData: NewCollectionData) {
        const collection: Collection = {
            title: newCollectionData.title || '',
            description: newCollectionData.description || '',
            public: newCollectionData.public || false,
            id: (this._collections.length + 1).toString(),
            authorId: MOCK_USER_ID,
            views: 0,
            likes: 0,
            links: [],
        }
        this._collections = [...this._collections, collection]
    }

    updateCollection(updatedCollection: Collection) {
        this._collections = this._collections.map((collection) => {
            if (collection.id === updatedCollection.id) {
                return updatedCollection
            }
            return collection
        })
    }
}
