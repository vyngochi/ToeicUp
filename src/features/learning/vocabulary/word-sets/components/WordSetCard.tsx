import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TooltipCommon } from '@/components/ui/tooltip'
import type { WordSet } from '@/types/learning.types'
import { removeWhiteSpace } from '@/utils/stringHandler'
import { GalleryHorizontalEnd } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface WordSetCardProps {
  word_set: WordSet
}
export default function WordSetCard({ word_set }: WordSetCardProps) {
  const navigate = useNavigate()
  const wordSetNameNormalize = removeWhiteSpace(word_set.name.toLowerCase())
  const percentLearned = word_set.learned_words
    ? Math.round((word_set.learned_words / word_set.total_words) * 100)
    : 0

  return (
    <Card className="glass-panel relative mx-auto flex h-full w-full max-w-sm flex-col gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300/50 hover:shadow-2xl md:w-60.5">
      {/* Image Container with Badge */}
      <div className="relative h-40 w-full overflow-hidden bg-white">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        <img
          src={word_set.thumbnail || 'https://github.com/shadcn.png'}
          alt="Word set cover"
          className="relative z-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 z-20">
          <Badge className="border-0 bg-blue-600/90 text-white shadow-sm backdrop-blur-md hover:bg-blue-500">
            Level: {word_set.level}
          </Badge>
        </div>
        {word_set.learned_words !== undefined && (
          <div className="absolute top-2 right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-md">
            <svg className="absolute h-10 w-10 -rotate-90 transform">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-slate-200"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="100.53"
                strokeDashoffset={100.53 - (100.53 * percentLearned) / 100}
                className="text-green-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="relative z-10 text-[8px] font-bold text-slate-700">
              {percentLearned}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <CardHeader className="flex-1 pt-4 pb-2">
        <CardTitle className="truncate text-lg font-bold text-slate-800 md:text-xl">
          {word_set.name}
        </CardTitle>
        <CardDescription className="mt-1 line-clamp-2 text-xs text-slate-500">
          {word_set.description || 'Bộ từ vựng chuẩn giúp bạn nâng cao vốn từ nhanh chóng.'}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex justify-between gap-2 pt-2 pb-4">
        <TooltipCommon text="Bảng từ vựng chi tiết" side="top">
          <Button
            className="flex-1 rounded-xl bg-blue-600 font-medium text-white shadow-md transition-all hover:bg-blue-700"
            onClick={() =>
              navigate(`/vocabulary/word-set/${wordSetNameNormalize}/${word_set.id}`, {
                state: { pageName: word_set.name },
              })
            }
          >
            Học từ vựng
          </Button>
        </TooltipCommon>

        <TooltipCommon text="Học qua Flashcard (SRS)" side="top">
          <Button
            className=":bg-slate-800 rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            variant={'outline'}
            size={'icon-sm'}
            onClick={() => navigate(`/learning/srs-review?wordSetId=${word_set.id}`)}
          >
            <GalleryHorizontalEnd size={18} />
          </Button>
        </TooltipCommon>
      </CardFooter>
    </Card>
  )
}
