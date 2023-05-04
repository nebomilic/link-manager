import { Injectable } from '@angular/core'
import { MOCK_COLLECTIONS } from './mock'
import { Collection } from 'src/app/types'

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
            (collection) => collection.authorId === '1'
        )
    }

    get discoveredCollections(): Collection[] {
        return this._collections.filter(
            (collection) => collection.authorId !== '1'
        )
    }

    deleteCollection(id: string) {
        this._collections = this._collections.filter(
            (collection) => collection.id !== id
        )
    }
}
