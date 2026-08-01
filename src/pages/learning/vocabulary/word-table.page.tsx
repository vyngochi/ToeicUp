import { Button } from '@/components/ui/button'
import WordTableData from '@/features/learning/vocabulary/word-table/components/WordTableData'

import { BookA, Diamond, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function WordTablePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { wordSetId } = useParams()

  return (
    <div className="m-2 flex h-[calc(100vh-(--spacing(13))-1rem)] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/40 p-3 shadow-xl backdrop-blur-md md:h-[calc(100vh-(--spacing(13))-2rem)] md:p-4 dark:bg-black/40">
      <div className="mb-3 flex shrink-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button
            className="h-9 w-9 shrink-0 rounded-lg border-none bg-white/50 p-0 text-gray-800 shadow-sm transition-all hover:bg-white/80 dark:bg-gray-800/50 dark:text-gray-200"
            variant={'outline'}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-blue-900 drop-shadow-sm md:text-xl dark:text-blue-100">
              {location.state?.pageName || 'Tất cả từ vựng'}
            </h2>
            <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase md:text-xs">
              Bảng từ vựng
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="h-9 rounded-lg bg-orange-500 text-xs text-white shadow-sm transition-all hover:bg-orange-600"
            onClick={() => navigate(`/learning/srs-review?wordSetId=${wordSetId}`)}
          >
            <Diamond className="mr-1.5" size={14} /> Học Flashcard
          </Button>
          <Button
            size="sm"
            className="h-9 rounded-lg bg-blue-600 text-xs text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <BookA className="mr-1.5" size={14} /> Luyện tập
          </Button>
        </div>
      </div>

      <div className="glass-panel flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl p-1 md:p-2">
        <WordTableData />
      </div>
    </div>
  )
}
