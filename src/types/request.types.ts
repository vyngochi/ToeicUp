export interface CommonRequest {
  searchKey?: string | null
  pageSize?: number
  pageIndex?: number
}

export interface GetListVocabRequest extends CommonRequest {
  wordSetId: string
}
