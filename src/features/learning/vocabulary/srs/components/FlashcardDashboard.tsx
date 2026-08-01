import { useGetDashboardWordSets } from '@/hooks/learning/useGetDashboardWordSets'
import FlashcardDeckCard from './FlashcardDeckCard'
import LearningLoading from '@/components/common/LearningLoading'
import { Layers, Target } from 'lucide-react'

export default function FlashcardDashboard() {
  const { data, isFetching } = useGetDashboardWordSets()

  return (
    <div className="w-full space-y-10 px-2 py-2 md:px-4 lg:py-4">
      {/* Decks Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Danh sách cần học hôm nay
          </h2>
        </div>

        {isFetching ? (
          <LearningLoading text="danh sách thẻ" />
        ) : data?.dueTodayTopics && data.dueTodayTopics.length > 0 ? (
          data.dueTodayTopics.map((topic) => (
            <div key={topic.id} className="mb-12">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-700">{topic.name}</h3>
                <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
                  {topic.word_sets.length} bộ
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {topic.word_sets.map((word_set) => (
                  <FlashcardDeckCard key={word_set.id} word_set={word_set} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel rounded-3xl border border-white/20 py-20 text-center">
            <Target size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-600">Tuyệt vời!</h3>
            <p className="mt-2 text-slate-500">Bạn đã hoàn thành mục tiêu ôn tập hôm nay.</p>
          </div>
        )}

        <div className="mt-12 mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Các flashcard vừa học
          </h2>
        </div>

        {isFetching ? (
          <LearningLoading text="danh sách thẻ" />
        ) : data?.recentlyLearnedTopics && data.recentlyLearnedTopics.length > 0 ? (
          data.recentlyLearnedTopics.map((topic) => (
            <div key={topic.id} className="mb-12">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-700">{topic.name}</h3>
                <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
                  {topic.word_sets.length} bộ
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {topic.word_sets.map((word_set) => (
                  <FlashcardDeckCard key={word_set.id} word_set={word_set} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel rounded-3xl border border-white/20 py-20 text-center">
            <Layers size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-600">Chưa có bộ thẻ nào</h3>
            <p className="mt-2 text-slate-500">Bạn cần thêm từ vựng vào bộ thẻ để bắt đầu học.</p>
          </div>
        )}
      </section>
    </div>
  )
}
