import { useGetListWordSetsWithTopics } from '@/hooks/learning/useGetListWordSets'
import { useGetSrsStats } from '@/hooks/learning/useGetSrsStats'
import FlashcardDeckCard from './FlashcardDeckCard'
import LearningLoading from '@/components/common/LearningLoading'
import { Layers, Zap, CheckCircle2, Target } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function FlashcardDashboard() {
  const { data, isFetching } = useGetListWordSetsWithTopics({ searchKey: null })
  const { data: stats, isLoading: isStatsLoading } = useGetSrsStats()

  return (
    <div className="w-full px-4 py-6 md:px-6 lg:py-8 space-y-10">
      
      {/* Header & Stats Section */}
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Tổng quan Flashcard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi tiến độ học tập và ôn tập từ vựng bằng phương pháp Lặp lại ngắt quãng (SRS).
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/20 dark:border-slate-800 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400">
              <Target size={18} />
              <span className="font-semibold text-sm uppercase tracking-wider">Cần ôn hôm nay</span>
            </div>
            {isStatsLoading ? <Skeleton className="h-10 w-16" /> : (
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">{stats?.dueToday || 0}</div>
            )}
          </div>
          
          <div className="glass-panel p-5 rounded-2xl border border-white/20 dark:border-slate-800 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
              <CheckCircle2 size={18} />
              <span className="font-semibold text-sm uppercase tracking-wider">Độ chính xác</span>
            </div>
            {isStatsLoading ? <Skeleton className="h-10 w-20" /> : (
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">{stats?.accuracy || 0}%</div>
            )}
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/20 dark:border-slate-800 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
              <Layers size={18} />
              <span className="font-semibold text-sm uppercase tracking-wider">Đã học</span>
            </div>
            {isStatsLoading ? <Skeleton className="h-10 w-16" /> : (
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">{stats?.totalLearned || 0}</div>
            )}
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/20 dark:border-slate-800 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-yellow-600 dark:text-yellow-400">
              <Zap size={18} />
              <span className="font-semibold text-sm uppercase tracking-wider">Chuỗi ngày</span>
            </div>
            {isStatsLoading ? <Skeleton className="h-10 w-16" /> : (
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">{stats?.streak || 0}</div>
            )}
          </div>
        </div>
      </section>

      {/* Decks Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Bộ bài (Decks) của bạn
          </h2>
        </div>

        {isFetching ? (
          <LearningLoading text="danh sách thẻ" />
        ) : data?.topics && data.topics.length > 0 ? (
          data.topics.map((topic) => (
            <div key={topic.id} className="mb-12">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                  {topic.name}
                </h3>
                <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
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
          <div className="glass-panel py-20 text-center rounded-3xl border border-white/20">
            <Layers size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">Chưa có bộ thẻ nào</h3>
            <p className="mt-2 text-slate-500">Bạn cần thêm từ vựng vào bộ thẻ để bắt đầu học.</p>
          </div>
        )}
      </section>
      
    </div>
  )
}
