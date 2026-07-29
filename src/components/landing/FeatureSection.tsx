import { AudioLines, BookOpenCheck, ChartLine, Diamond, FileSliders, Sparkles } from 'lucide-react'
import type { FeatureCardTypes } from '../common/FeatureCard'
import FeatureCard from '../common/FeatureCard'
import { FeatureCardCarousel } from '../common/FeatureCardCarousel'

const iconColor = 'var(--color-blue-400)'
const featureArr: FeatureCardTypes[] = [
  {
    icon: <FileSliders color={iconColor} />,
    title: 'SRS Thông minh',
    content:
      'Ôn tập đúng lúc dựa trên thuật toán Spaced Repetition. Ghi nhớ lâu hơn, quên ít hơn. Tự động lên lịch cho từng từ.',
  },
  {
    icon: <Sparkles color={iconColor} />,
    title: 'AI sinh bài tập',
    content:
      'Bài tập Part 5, 6, 7 được Claude AI tạo tự động từ từ vựng bạn đang học. Giải thích đáp án bằng tiếng Việt chi tiết.',
  },
  {
    icon: <Diamond color={iconColor} />,
    title: 'Flashcard',
    content:
      'Lật thẻ với animation mượt. Nghe phát âm chuẩn. Xem ví dụ câu và mẹo nhớ từ do AI tạo theo từng người.',
  },
  {
    icon: <AudioLines color={iconColor} />,
    title: 'Luyện Listening',
    content:
      'Audio player chuẩn TOEIC với giới hạn nghe lại theo từng Part. Transcript và giải thích chỉ hiện sau khi nộp bài.',
  },
  {
    icon: <ChartLine color={iconColor} />,
    title: 'Thống kê',
    content:
      'Streak calendar, biểu đồ tiến độ, từ hay sai, tỉ lệ đúng theo chủ đề. Nhìn là biết ngay mình yếu ở đâu.',
  },
  {
    icon: <BookOpenCheck color={iconColor} />,
    title: 'Đáp án tiếng Việt',
    content:
      'Toàn bộ nghĩa từ, ví dụ câu, giải thích đáp án đều có tiếng Việt. Học nhanh hơn không cần tra từ điển riêng.',
  },
]
export default function FeatureSection() {
  return (
    <div id="feature" className="relative flex items-center justify-center py-24 xl:min-h-screen">
      {/* Background blobs for Glassmorphism */}
      <div className="absolute top-1/4 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-200 opacity-20 mix-blend-multiply blur-3xl filter" />
      <div className="absolute bottom-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-amber-100 opacity-30 mix-blend-multiply blur-3xl filter" />

      <div className="w-[85%] max-w-7xl text-center">
        <div className="mb-3 font-semibold tracking-wider text-(--color-blue-600) uppercase text-sm md:text-base">TÍNH NĂNG</div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-gray-900">
          Chinh phục TOEIC dễ dàng hơn
        </h2>
        <div className="mb-12 mt-6 flex items-center justify-center">
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-600 md:text-lg">
            Học từ vựng thông minh, luyện đề sát đề thi và nhận giải thích bằng AI — tất cả trong
            một nền tảng
          </p>
        </div>
        <div className="hidden gap-5 sm:grid md:grid-cols-2 lg:grid-cols-3">
          {featureArr.map((item) => (
            <FeatureCard
              key={item.content}
              icon={item.icon}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
        <div className="flex justify-center md:hidden">
          <FeatureCardCarousel features={featureArr} />
        </div>
      </div>
    </div>
  )
}
