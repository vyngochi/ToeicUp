import { useStepScroll } from '@/hooks/useStepScroll.landing'
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
    <div className="bg-(--color-blue-50)">
      <section
        className="mx-auto flex max-w-4xl flex-col justify-items-center px-6 py-24 align-middle"
        id="works"
      >
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Bắt đầu chỉ trong 4 bước</h2>
          <p className="mt-3 text-gray-500">Không cần chuẩn bị gì. Tạo tài khoản và học ngay.</p>
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

        <div className="flex flex-col gap-5 md:ml-[15%] md:gap-15 lg:ml-[20%]">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRef.current[index] = el
              }}
              className={cn(
                'flex items-start gap-6 transition-all duration-500',
                activeStep >= index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-30',
              )}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                {step.id}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                <p className="mt-1 text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
