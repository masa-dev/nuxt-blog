interface TimeStamp {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export interface Post extends TimeStamp {
  id: string
  title: string
  body: string
}

export interface PostList {
  contents: Post[]
  limit: number
  offset: number
  totalCount: number
}
