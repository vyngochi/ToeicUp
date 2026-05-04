import { useGetListWordSets } from '@/hooks/learning/useGetListWordSets'
import WordSetCard from './WordSetCard'
import { InputInline } from '@/components/common/SearchInput'
import { useState } from 'react'
import type { ListWordSetsResponse } from '@/types/learning.types'
import LearningLoading from '@/components/common/LearningLoading'

interface WordSetListProps {
  data: ListWordSetsResponse | undefined
}

export default function WordSet() {
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const { data, isFetching } = useGetListWordSets({ searchKey: searchValue })

  return (
    <div>
      <h4 className="mb-5 scroll-m-20 text-3xl font-semibold tracking-tight">Bộ từ vựng</h4>
      <div className="mb-5 max-w-75">
        <InputInline onSearch={setSearchValue} />
      </div>
      {isFetching ? <LearningLoading text="bộ từ vựng" /> : <WordSetList data={data} />}
    </div>
  )
}

const WordSetList = ({ data }: WordSetListProps) => {
  return data?.topics.map((topic) => (
    <div key={topic.id} className="mb-10">
      {topic.word_sets.length > 0 && (
        <>
          <h2 className="mb-5 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {topic.name}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {topic.word_sets.map((word_set) => (
              <WordSetCard key={word_set.id} word_set={word_set} />
            ))}
          </div>
        </>
      )}
    </div>
  ))
}
