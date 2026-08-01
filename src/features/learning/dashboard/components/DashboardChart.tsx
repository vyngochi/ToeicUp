import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ChartData } from '@/types/learning.types'
import { BarChart3 } from 'lucide-react'

interface DashboardChartProps {
  monthlyData: ChartData[]
  yearlyData: ChartData[]
}

export default function DashboardChart({ monthlyData, yearlyData }: DashboardChartProps) {
  const [activeTab, setActiveTab] = useState('monthly')

  // Prevent hydration/rendering issues with empty arrays
  const data = activeTab === 'monthly' ? monthlyData : yearlyData

  return (
    <div className="glass-panel flex h-full flex-col rounded-3xl border border-white/20 bg-white/50 p-6 shadow-sm backdrop-blur-sm  ">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 ">
          <BarChart3 size={20} className="text-blue-500" />
          Từ vựng đã học
        </h3>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
            <TabsTrigger value="yearly">Theo năm</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4 min-h-[250px] w-full flex-1">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  padding: '12px',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
              />
              <Bar
                dataKey="learned"
                name="Từ vựng"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400 italic">
            Chưa có dữ liệu
          </div>
        )}
      </div>
    </div>
  )
}
