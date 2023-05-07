export type Collection = {
    id: string
    authorId: string
    title: string
    description: string | null
    public: boolean
    views: number
    likes: number
    links: string[]
    timestamp?: any
}

export type NewCollectionData = {
    title?: string | null
    description?: string | null
    public?: boolean | null
}
