export type Vocab<T> = {
  Id: string
  Term: string
  WordForm: string
  Phonetic: string | null
  AudioUrl: string | null
  Topic: string
  Level: number
  word_definitions: T[]
  CreatedAt?: Date | null
  UpdateAt?: Date | null
}

export type VocabDef = {
  Id: string
  DefinitionEn: string
  DefinitionVi: string
}
