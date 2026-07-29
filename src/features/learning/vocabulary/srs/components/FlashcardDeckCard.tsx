import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { WordSet } from '@/types/learning.types'
import { Play, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface FlashcardDeckCardProps {
  word_set: WordSet
}

export default function FlashcardDeckCard({ word_set }: FlashcardDeckCardProps) {
  const navigate = useNavigate()

  return (
    <div className="group relative w-full h-full max-w-sm mx-auto perspective-1000">
      {/* Background Cards for 3D Stack Effect */}
      <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transform translate-y-3 scale-90 opacity-40 transition-all duration-300 group-hover:translate-y-4 group-hover:scale-[0.92]" />
      <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transform translate-y-1.5 scale-95 opacity-70 transition-all duration-300 group-hover:translate-y-2 group-hover:scale-95" />

      {/* Main Front Card */}
      <div className="relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-blue-300/50">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={word_set.thumbnail || "https://github.com/shadcn.png"}
            alt={word_set.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-20">
            <Badge className="bg-white/90 text-blue-700 hover:bg-white border-0 shadow-sm backdrop-blur-md font-semibold">
              <Layers size={14} className="mr-1" /> {word_set.total_words} thẻ
            </Badge>
          </div>
          <div className="absolute bottom-2 left-3 z-20">
            <Badge className="bg-blue-600/90 text-white hover:bg-blue-500 border-0 shadow-sm backdrop-blur-md">
              Level {word_set.level}
            </Badge>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
            {word_set.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
            {word_set.description || "Tập hợp các từ vựng chọn lọc giúp bạn nâng cao điểm số."}
          </p>

          <Button 
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all font-semibold mt-auto"
            onClick={() => navigate(`/learning/srs-review?wordSetId=${word_set.id}`)}
          >
            <Play size={16} className="mr-2 fill-current" /> Ôn tập ngay
          </Button>
        </div>
      </div>
    </div>
  )
}
