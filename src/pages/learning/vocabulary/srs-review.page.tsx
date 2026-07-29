import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FlashcardUI from '@/features/learning/vocabulary/srs/FlashcardUI'
// Import these API hooks if you have them, or you'll need to create them based on the backend API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import LearningLoading from '@/components/common/LearningLoading'
import { toast } from 'sonner'
import { api } from '@/configs/axios'

export default function SrsReviewPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const wordSetId = searchParams.get('wordSetId')
  const queryClient = useQueryClient()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch daily review words
  const { data, isLoading } = useQuery({
    queryKey: ['srs-daily', wordSetId],
    queryFn: async () => {
      const res = await api.get(`/api/learning/srs/daily`, {
        params: { wordSetId, limit: 20 },
      })
      return res.data.data
    },
    refetchOnWindowFocus: false,
  })

  // Submit review mutation
  const { mutate: submitReview } = useMutation({
    mutationFn: async ({ wordId, quality }: { wordId: string; quality: number }) => {
      const res = await api.post(`/api/learning/srs/review`, { wordId, quality })
      return res.data
    },
    onSuccess: () => {
      // Move to next word
      if (data?.words && currentIndex < data.words.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        // Finished all words
        setCurrentIndex((prev) => prev + 1) // Increment to show completion screen
        toast.success('Tuyệt vời! Bạn đã hoàn thành bài ôn tập.')
        queryClient.invalidateQueries({ queryKey: ['srs-daily'] })
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50/50 dark:bg-black/50">
        <LearningLoading text="thẻ học" />
      </div>
    )
  }

  const words = data?.words || []
  const isCompleted = currentIndex >= words.length

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative Blob */}
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-900/20" />

      {/* Header (Minimal) */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2" size={20} /> Thoát (Esc)
        </Button>
        <div className="flex items-center gap-2 font-medium text-gray-500">
          Tiến độ:{' '}
          <span className="font-bold text-blue-600">{Math.min(currentIndex, words.length)}</span> /{' '}
          {words.length} thẻ
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex w-full flex-1 flex-col items-center justify-center p-6">
        {words.length === 0 ? (
          <div className="glass-panel flex max-w-md flex-col items-center rounded-3xl p-10 text-center">
            <CheckCircle2 size={64} className="mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold">Không có thẻ nào!</h2>
            <p className="mb-6 text-gray-500">
              Bạn đã học hết từ vựng cho ngày hôm nay. Hãy quay lại vào ngày mai nhé.
            </p>
            <Button onClick={() => navigate(-1)}>Quay lại Bảng từ vựng</Button>
          </div>
        ) : isCompleted ? (
          <div className="glass-panel animate-in zoom-in flex max-w-md flex-col items-center rounded-3xl p-10 text-center duration-500">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="mb-2 text-3xl font-bold">Hoàn thành xuất sắc!</h2>
            <p className="mb-8 text-gray-500">
              Bạn đã xuất sắc hoàn thành {words.length} thẻ từ vựng hôm nay. Việc lặp lại đúng lúc
              sẽ giúp bạn nhớ lâu hơn.
            </p>
            <Button size="lg" className="w-full rounded-xl text-lg" onClick={() => navigate(-1)}>
              Kết thúc phiên học
            </Button>
          </div>
        ) : (
          <FlashcardUI
            key={words[currentIndex].Id} // Key helps remount the component when word changes to reset flip state
            word={words[currentIndex]}
            onRate={(quality) => submitReview({ wordId: words[currentIndex].Id, quality })}
          />
        )}
      </main>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 h-2 w-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{
            width: `${(Math.min(currentIndex, words.length) / (words.length || 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
