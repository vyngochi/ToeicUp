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
    <div id="feature" className="mt-5 flex items-center justify-center xl:h-screen">
      <div className="w-[70%] text-center md:w-[80%]">
        <div className="mb-2 font-medium text-(--color-blue-600) md:text-xl">TÍNH NĂNG</div>
        <div className="text-xl font-medium md:text-3xl lg:text-4xl">
          Chinh phục TOEIC dễ dàng hơn
        </div>
        <div className="mb-5 flex items-center justify-center">
          <div className="md:mx-2xl mx-auto mt-1 max-w-2xl text-center text-sm leading-relaxed text-(--color-gray-600) md:text-lg lg:mx-20">
            Học từ vựng thông minh, luyện đề sát đề thi và nhận giải thích bằng AI — tất cả trong
            một nền tảng
          </div>
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
