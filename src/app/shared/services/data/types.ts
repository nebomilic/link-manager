export enum DBCollectionName {
    Collections = 'collections',
    FavoriteCollections = 'favorite_collections',
}

export type FavoriteCollectionIds = {
    authorId: string
    collectionIds: string[]
}
