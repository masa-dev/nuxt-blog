export interface TimeStamp {
  _id: string
  _sys: {
    raw: {
      createdAt: string
      updatedAt: string
      firstPublishedAt: string
      publishedAt: string
    }

    createdAt: string
    updatedAt: string
  }
}

export interface Meta {
  title: string
  description: string
  ogimage: {
    _id: string
    title: string
    description: string
    src: string
    width: number
    height: number
    altText: string
    fileName: string
    fileSize: number
    fileType: string
    metadata: object
  }
}

export interface Image {
  _id: string
  metadata: object
  title: string
  src: string
  altText: string
  description: string
  fileName: string
  fileType: string
  fileSize: number
  height: number
  width: number
}

export interface ApiParams {
  limit: number
  skip: number
}

export interface Author extends TimeStamp {
  name: string
  slug: string
  biography: string
  image: null | Image
}

export interface Tag extends TimeStamp {
  name: string
  slug: string
  image: Image
}

export interface ReferencedTag extends TimeStamp {
  name: string
  slug: string
  image: string
}

export interface Post extends TimeStamp {
  title: string
  slug: string
  body: string
  image: Image
  author: Author
  tags: Array<ReferencedTag>
}

export interface Note extends TimeStamp {
  title: string
  slug: string
  meta: Meta
  body: string
  author: Author
  tag: Array<ReferencedTag>
}

export interface PostResponse extends ApiParams {
  total: number
  items: Array<Post>
}

export interface NoteResponse extends ApiParams {
  total: number
  items: Array<Note>
}

export interface TagResponse extends ApiParams {
  total: number
  items: Array<Tag>
}

export interface AuthorResponse extends ApiParams {
  total: number
  items: Array<Author>
}
