import { Button } from '@/components/ui/button'
import WordTableData from '@/features/learning/vocabulary/word-table/components/WordTableData'

import { BookA, Diamond, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function WordTablePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { wordSetId } = useParams()

  return (
    <div className="flex h-[calc(100vh-theme(spacing.13)-2rem)] flex-col rounded-3xl border border-white/20 bg-white/40 p-4 md:p-8 shadow-xl backdrop-blur-md dark:bg-black/40 overflow-hidden">
      <Button
        className="mb-4 self-start rounded-xl border-none bg-white/50 text-gray-800 shadow-sm transition-all hover:bg-white/80 shrink-0"
        variant={'outline'}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" size={16} /> Trở lại
      </Button>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end shrink-0">
        <div>
          <h4 className="mb-1 text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Bảng từ vựng
          </h4>
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-blue-900 drop-shadow-sm dark:text-blue-100">
            {location.state?.pageName || 'Tất cả từ vựng'}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            className="transform rounded-xl bg-orange-500 text-white shadow-md transition-all hover:scale-105 hover:bg-orange-600"
            onClick={() => navigate(`/learning/srs-review?wordSetId=${wordSetId}`)}
          >
            <Diamond className="mr-2" size={16} /> Học Flashcard (SRS)
          </Button>
          <Button className="transform rounded-xl bg-blue-600 text-white shadow-md transition-all hover:scale-105 hover:bg-blue-700">
            <BookA className="mr-2" size={16} /> Luyện tập
          </Button>
        </div>
      </div>

      <div className="glass-panel flex flex-1 flex-col overflow-hidden rounded-2xl p-2 min-h-0">
        <WordTableData />
      </div>
    </div>
  )
}
