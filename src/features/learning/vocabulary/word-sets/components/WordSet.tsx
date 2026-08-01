import { useGetListWordSetsWithTopics } from '@/hooks/learning/useGetListWordSets'
import WordSetCard from './WordSetCard'
import EmptyWordSet from './EmptyWordSet'
import { useState, useMemo, useEffect } from 'react'
import type { ListWordSetsResponse } from '@/types/learning.types'
import LearningLoading from '@/components/common/LearningLoading'
import { Library, Search, ListFilter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

interface WordSetListProps {
  data: ListWordSetsResponse | undefined
  levelFilter: number | null
}

const levels = [
  { value: null, label: 'Tất cả' },
  { value: 1, label: 'Level 1 (300+)' },
  { value: 2, label: 'Level 2 (500+)' },
  { value: 3, label: 'Level 3 (700+)' },
  { value: 4, label: 'Level 4 (900+)' },
]

export default function WordSet() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string | null>(null)
  const [levelFilter, setLevelFilter] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue || null), 500)
    return () => clearTimeout(timer)
  }, [searchValue])

  const { data, isFetching } = useGetListWordSetsWithTopics({ searchKey: debouncedSearch })

  return (
    <div className="w-full px-4 py-6 md:px-1 lg:py-1">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="hidden text-3xl font-bold tracking-tight text-slate-800 md:block">
          Bộ từ vựng
        </h1>

        <div className="ml-auto flex flex-1 items-center gap-2 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              className="h-11 rounded-xl border-slate-200 bg-white pl-10"
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="relative h-11 w-11 rounded-xl border-slate-200 bg-white p-0"
              >
                <ListFilter size={20} className="text-slate-600" />
                {levelFilter !== null && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    1
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetHeader className="mb-6">
                <SheetTitle>Lọc bộ từ vựng</SheetTitle>
                <SheetDescription>Lọc theo cấp độ TOEIC mong muốn</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3">
                {levels.map((level) => (
                  <SheetClose asChild key={level.label}>
                    <Button
                      variant={levelFilter === level.value ? 'default' : 'outline'}
                      className={levelFilter === level.value ? 'bg-blue-600' : 'justify-start'}
                      onClick={() => setLevelFilter(level.value)}
                    >
                      {level.label}
                    </Button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isFetching ? (
        <LearningLoading text="bộ từ vựng" />
      ) : (
        <WordSetList data={data} levelFilter={levelFilter} />
      )}
    </div>
  )
}

const WordSetList = ({ data, levelFilter }: WordSetListProps) => {
  // Client-side filtering by level
  const filteredTopics = useMemo(() => {
    if (!data?.topics) return []

    return data.topics
      .map((topic) => {
        const filteredWordSets = levelFilter
          ? topic.word_sets.filter((ws) => ws.level === levelFilter)
          : topic.word_sets

        return {
          ...topic,
          word_sets: filteredWordSets,
        }
      })
      .filter((topic) => topic.word_sets.length > 0)
  }, [data, levelFilter])

  if (filteredTopics.length === 0) {
    return <EmptyWordSet />
  }

  return filteredTopics.map((topic) => (
    <div key={topic.id} className="mb-14">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Library size={20} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">{topic.name}</h2>
        <span className="ml-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
          {topic.word_sets.length} bộ
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topic.word_sets.map((word_set) => (
          <WordSetCard key={word_set.id} word_set={word_set} />
        ))}
      </div>
    </div>
  ))
}
