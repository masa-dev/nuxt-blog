export interface MicroCmsSearchParam {
  draftKey?: string
  limit?: number
  offset?: number
  orders?: string
  q?: string
  fields?: string // title,main_image,updatedAt,author.name
  ids?: string // first_id,second_id,third_id
  filters?: string
  depth?: number
  richEditorFormat?: "html" | "object"
}

export interface MicroCmsFindParam {
  draftKey?: string
  filters?: string
  depth?: number
  richEditorFormat?: "html" | "object"
}

export interface NewtSearchParam {
  limit?: number
  skip?: number
}

function paramToString(param: MicroCmsSearchParam | MicroCmsFindParam | NewtSearchParam): string {
  let sp = new URLSearchParams(param as URLSearchParams)

  return sp.toString()
}

export { paramToString }
