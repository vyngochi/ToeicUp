export type AdminWordSet<T> = {
  name: string
  level: number
  id: string
  description: string | null
  total_words: number
  thumbnail: string | null
  created_at: Date | null
  updated_at: Date | null
  topics: T
}

export type AdminTopic = {
  id: string
  name: string
  description: string | null
  thumbnail: string | null
}

export type ListAllWordSetAdmin = {
  wordSets: AdminWordSet<AdminTopic>[]
}
