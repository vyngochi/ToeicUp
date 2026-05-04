export interface CommonGetListResponse {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type Topics<T> = {
  name: string
  id: string
  description: string | null
  word_sets: T[]
  total_words: number
  thumbnail: string | null
}

export type WordSet = {
  level: number
  name: string
  id: string
  description: string | null
  total_words: number
}

export interface ListWordSetsResponse extends CommonGetListResponse {
  topics: Topics<WordSet>[]
}
