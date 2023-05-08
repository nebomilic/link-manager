import firebase from 'firebase/compat'

export type FirestoreTimestamp = firebase.firestore.Timestamp
export type Collection = {
    id: string
    authorId: string
    title: string
    description: string | null
    public: boolean
    views: number
    likes: number
    links: string[]
    timestamp?: FirestoreTimestamp
}

export type NewCollectionData = {
    title?: string | null
    description?: string | null
    public?: boolean | null
    links?: string[] | null
}
