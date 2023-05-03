import { Injectable } from '@angular/core'
import { MOCK_DISCOVERED_COLLECTIONS, MOCK_MY_COLLECTIONS } from './mock'
import { Collection } from 'src/app/types'

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    getCollections(): Collection[] {
        return [...MOCK_DISCOVERED_COLLECTIONS, ...MOCK_MY_COLLECTIONS]
    }
    getMyCollections(): Collection[] {
        return MOCK_MY_COLLECTIONS
    }
    getDiscoveredCollections(): Collection[] {
        return MOCK_DISCOVERED_COLLECTIONS
    }
}
