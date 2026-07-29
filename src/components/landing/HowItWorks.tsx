import { useStepScroll } from '@/hooks/systems/useStepScroll.landing'
import { StepCircle } from '../common/StepCircle'
import { cn } from '@/lib/utils'
import { StepLine } from '../common/StepLine'

const STEPS = [
  { id: 1, title: 'Tạo tài khoản', description: 'Đăng ký miễn phí, chọn mục tiêu' },
  { id: 2, title: 'Học Flashcard', description: 'Học từ mới qua thẻ lật, nghe phát âm' },
  { id: 3, title: 'Luyện bài tập AI', description: 'Làm bài Reading & Listening do AI tạo' },
  { id: 4, title: 'Theo dõi tiến độ', description: 'Xem streak, biểu đồ điểm, ôn từ yếu' },
]
export default function HowItWorksSection() {
  const { activeStep, stepRef } = useStepScroll()

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 opacity-40 mix-blend-multiply blur-[100px] filter" />
      <section
        className="mx-auto flex max-w-5xl flex-col justify-items-center px-6 py-32 align-middle"
        id="works"
      >
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Bắt đầu chỉ trong 4 bước</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Không cần chuẩn bị gì. Tạo tài khoản và học ngay hôm nay.</p>
        </div>

        <div className="mb-16 ml-[10%] flex items-center md:ml-[15%] lg:ml-[20%]">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <StepCircle
                step={step.id}
                isCompleted={activeStep > index + 1}
                isActive={activeStep === index + 1}
              />

              {index < STEPS.length - 1 && <StepLine isCompleted={activeStep > index + 1} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 md:ml-[15%] md:gap-12 lg:ml-[20%]">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRef.current[index] = el
              }}
              className={cn(
                'flex items-start gap-8 transition-all duration-700 ease-out p-6 rounded-2xl glass-panel',
                activeStep >= index + 1 ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-30',
              )}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
                {step.id}
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
