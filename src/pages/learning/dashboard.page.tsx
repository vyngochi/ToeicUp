import { useGetSrsStats } from '@/hooks/learning/useGetSrsStats'
import { Skeleton } from '@/components/ui/skeleton'
import { Layers, Zap, CheckCircle2, Target, BookOpen } from 'lucide-react'
import DashboardChart from '@/features/learning/dashboard/components/DashboardChart'

export default function DashboardPage() {
  const { data: stats, isLoading: isStatsLoading } = useGetSrsStats()

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-6 md:px-6 lg:py-8">
      {/* Header Section */}
      <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Tổng quan học tập</h1>
          <p className="mt-1 text-slate-500">
            Theo dõi tiến độ học tập và ôn tập từ vựng bằng phương pháp Lặp lại ngắt quãng (SRS).
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-700">Chỉ số cá nhân</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="glass-panel flex flex-col justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-orange-50 to-orange-100/50 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-orange-600">
              <Target size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Cần ôn hôm nay</span>
            </div>
            {isStatsLoading ? (
              <Skeleton className="h-10 w-16 bg-white/50" />
            ) : (
              <div className="text-4xl font-bold text-slate-800">{stats?.dueToday || 0}</div>
            )}
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Độ chính xác</span>
            </div>
            {isStatsLoading ? (
              <Skeleton className="h-10 w-20 bg-white/50" />
            ) : (
              <div className="text-4xl font-bold text-slate-800">{stats?.accuracy || 0}%</div>
            )}
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <Layers size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Đã học</span>
            </div>
            {isStatsLoading ? (
              <Skeleton className="h-10 w-16 bg-white/50" />
            ) : (
              <div className="text-4xl font-bold text-slate-800">{stats?.totalLearned || 0}</div>
            )}
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-yellow-600">
              <Zap size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Chuỗi ngày</span>
            </div>
            {isStatsLoading ? (
              <Skeleton className="h-10 w-16 bg-white/50" />
            ) : (
              <div className="text-4xl font-bold text-slate-800">{stats?.streak || 0}</div>
            )}
          </div>
        </div>
      </section>

      {/* Chart and Welcome Widget */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isStatsLoading ? (
            <Skeleton className="h-[350px] w-full rounded-3xl bg-white/50" />
          ) : (
            <DashboardChart
              monthlyData={stats?.monthlyData || []}
              yearlyData={stats?.yearlyData || []}
            />
          )}
        </div>

        <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/20 bg-blue-600 p-6 text-white shadow-sm lg:col-span-1">
          <div className="relative z-10 flex h-full flex-col justify-center">
            <h3 className="mb-2 text-xl font-bold text-white">Bạn đã sẵn sàng học chưa?</h3>
            <p className="mb-6 max-w-sm text-blue-100">
              Mỗi ngày một chút tiến bộ sẽ tạo nên thành công lớn. Hãy bắt đầu ôn tập các từ vựng
              cần thiết cho hôm nay.
            </p>
            <a
              href="/vocabulary/flashcard"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 font-semibold text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
            >
              <BookOpen size={18} />
              Ôn tập ngay
            </a>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 transform opacity-20">
            <Zap size={200} />
          </div>
        </div>
      </section>
    </div>
  )
}
