interface TimeStamp {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

interface ListStamp {
  limit: number
  offset: number
  totalCount: number
}

interface ImageData {
  url: string
  height: number
  width: number
}

export interface Tag extends TimeStamp {
  id: string
  name: string
  image: ImageData
}

export interface Post extends TimeStamp {
  id: string
  title: string
  image: ImageData
  body: string
  tags: Tag[]
}

export interface Note extends TimeStamp {
  id: string
  title: string
  body: string
  tags: Tag[]
}

export interface TagList extends ListStamp {
  contents: Tag[]
}

export interface PostList extends ListStamp {
  contents: Post[]
}

export interface NoteList extends ListStamp {
  contents: Note[]
}
