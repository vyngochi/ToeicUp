import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'ToeicUp có giúp tôi tự học TOEIC hiệu quả tại nhà không?',
    answer: 'Hoàn toàn có thể. ToeicUp được thiết kế đặc biệt cho việc tự học với lộ trình thông minh, hệ thống Spaced Repetition (lặp lại ngắt quãng) giúp bạn nhớ từ vựng lâu hơn và bộ đề thi sát với đề thi thực tế.',
  },
  {
    question: 'Giải thích đáp án bằng AI hoạt động như thế nào?',
    answer: 'Khi bạn hoàn thành một bài tập TOEIC Listening hoặc Reading, AI của ToeicUp sẽ phân tích câu trả lời của bạn, giải thích chi tiết tại sao đúng/sai bằng tiếng Việt, cung cấp transcript (bản dịch) và mẹo làm bài cho từng câu.',
  },
  {
    question: 'Làm sao để học từ vựng TOEIC siêu tốc?',
    answer: 'ToeicUp kết hợp Flashcard thông minh với hệ thống SRS. Thuật toán sẽ tính toán thời điểm bạn chuẩn bị quên một từ để nhắc nhở ôn lại, kết hợp với hình ảnh và ví dụ sinh động do AI tạo ra giúp não bộ ghi nhớ sâu hơn.',
  },
  {
    question: 'Tôi có thể thi thử TOEIC online trên ToeicUp không?',
    answer: 'Có! Chúng tôi cung cấp các đề thi thử TOEIC Full Test (200 câu) với giao diện làm bài giống 99% đề thi thật, có đồng hồ đếm ngược và chấm điểm tự động ngay sau khi nộp bài.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-gray-50/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Giải đáp những thắc mắc phổ biến về việc luyện thi TOEIC cùng ToeicUp.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-panel overflow-hidden rounded-2xl transition-all duration-300"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-gray-500 transition-transform duration-300',
                    openIndex === index ? 'rotate-180' : '',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="p-6 pt-0 text-base leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
