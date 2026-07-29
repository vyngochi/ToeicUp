import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { WordSet } from '@/types/learning.types'
import { Play, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface FlashcardDeckCardProps {
  word_set: WordSet
}

export default function FlashcardDeckCard({ word_set }: FlashcardDeckCardProps) {
  const navigate = useNavigate()

  return (
    <div className="group perspective-1000 relative mx-auto h-full w-full max-w-sm">
      {/* Background Cards for 3D Stack Effect */}
      <div className="absolute inset-0 translate-y-3 scale-90 transform rounded-2xl border border-slate-200 bg-white opacity-40 shadow-sm transition-all duration-300 group-hover:translate-y-4 group-hover:scale-[0.92] dark:border-slate-700 dark:bg-slate-800" />
      <div className="absolute inset-0 translate-y-1.5 scale-95 transform rounded-2xl border border-slate-200 bg-white opacity-70 shadow-sm transition-all duration-300 group-hover:translate-y-2 group-hover:scale-95 dark:border-slate-700 dark:bg-slate-800" />

      {/* Main Front Card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-300/50 group-hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <img
            src={word_set.thumbnail || 'https://github.com/shadcn.png'}
            alt={word_set.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-20">
            <Badge className="border-0 bg-white/90 font-semibold text-blue-700 shadow-sm backdrop-blur-md hover:bg-white">
              <Layers size={14} className="mr-1" /> {word_set.total_words} thẻ
            </Badge>
          </div>
          <div className="absolute bottom-2 left-3 z-20">
            <Badge className="border-0 bg-blue-600/90 text-white shadow-sm backdrop-blur-md hover:bg-blue-500">
              Level {word_set.level}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1 line-clamp-1 text-lg font-bold text-slate-800 dark:text-slate-100">
            {word_set.name}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-500 dark:text-slate-400">
            {word_set.description || 'Tập hợp các từ vựng chọn lọc giúp bạn nâng cao điểm số.'}
          </p>

          <Button
            className="mt-auto w-full rounded-xl bg-blue-600 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
            onClick={() => navigate(`/learning/srs-review?wordSetId=${word_set.id}`)}
          >
            <Play size={16} className="mr-2 fill-current" /> Ôn tập ngay
          </Button>
        </div>
      </div>
    </div>
  )
}
