import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
  return (
    <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300/50 glass-panel md:w-60.5">
      {/* Image Container with Badge */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          src={word_set.thumbnail || "https://github.com/shadcn.png"}
          alt="Word set cover"
          className="relative z-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 z-20">
          <Badge className="border-0 bg-blue-600/90 text-white backdrop-blur-md hover:bg-blue-500 shadow-sm">
            Level: {word_set.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="flex-1 pb-2 pt-4">
        <CardTitle className="truncate text-lg font-bold text-slate-800 dark:text-slate-100 md:text-xl">
          {word_set.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
          {word_set.description || "Bộ từ vựng chuẩn giúp bạn nâng cao vốn từ nhanh chóng."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex justify-between gap-2 pb-4 pt-2">
        <TooltipCommon text="Bảng từ vựng chi tiết" side="top">
          <Button
            className="flex-1 rounded-xl bg-blue-600 font-medium shadow-md transition-all hover:bg-blue-700 text-white"
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
            className="rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
