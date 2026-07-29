import { CheckCircle2 } from 'lucide-react'

export default function SEOContentSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Tại sao nên luyện thi TOEIC cùng ToeicUp?
            </h2>
            
            <div className="prose prose-gray max-w-none text-gray-600">
              <p className="mb-6 text-base leading-relaxed md:text-lg">
                Để đạt điểm cao trong kỳ thi TOEIC (Test of English for International Communication), 
                việc chỉ giải đề là chưa đủ. Bạn cần một chiến lược học tập thông minh, từ vựng vững chắc 
                và khả năng nắm bắt cấu trúc đề thi. <strong>ToeicUp</strong> là nền tảng học tiếng Anh 
                ứng dụng công nghệ AI tiên tiến, giúp bạn tối ưu hóa thời gian luyện thi TOEIC của mình.
              </p>

              <h3 className="mb-4 mt-8 text-xl font-semibold text-gray-900">
                1. Học từ vựng TOEIC bằng Spaced Repetition (Lặp lại ngắt quãng)
              </h3>
              <p className="mb-6 leading-relaxed">
                Từ vựng là xương sống của các kỹ năng <strong>TOEIC Listening</strong> và <strong>TOEIC Reading</strong>. 
                Hệ thống Flashcard thông minh của ToeicUp sẽ tự động phân tích khả năng ghi nhớ của bạn để 
                nhắc lại từ mới vào đúng thời điểm bạn chuẩn bị quên. Nhờ đó, việc học từ vựng TOEIC trở nên 
                nhẹ nhàng hơn bao giờ hết.
              </p>

              <h3 className="mb-4 mt-8 text-xl font-semibold text-gray-900">
                2. Luyện thi TOEIC online sát với đề thi thực tế
              </h3>
              <p className="mb-6 leading-relaxed">
                Kho đề thi thử TOEIC khổng lồ được cập nhật liên tục theo format mới nhất. Giao diện thi thử online 
                mô phỏng 99% trải nghiệm thi thật giúp bạn làm quen với áp lực thời gian. 
                Bài làm sẽ được tự động chấm điểm và đánh giá ngay lập tức.
              </p>

              <h3 className="mb-4 mt-8 text-xl font-semibold text-gray-900">
                3. Giải thích đáp án chi tiết bằng AI Tiếng Việt
              </h3>
              <p className="mb-6 leading-relaxed">
                Điểm khác biệt lớn nhất của ToeicUp chính là "Gia sư AI". Bất cứ khi nào bạn sai một câu 
                ngữ pháp hay từ vựng, AI sẽ phân tích chuyên sâu tại sao đáp án đó lại sai, cung cấp bản dịch 
                (transcript) đầy đủ và đưa ra mẹo tránh bẫy.
              </p>

              <div className="mt-10 rounded-2xl bg-blue-50/50 p-6">
                <h4 className="mb-4 font-semibold text-gray-900">Lợi ích vượt trội:</h4>
                <ul className="space-y-3">
                  {[
                    'Tiết kiệm 50% thời gian tự học TOEIC tại nhà.',
                    'Lộ trình cá nhân hóa theo từng mục tiêu điểm (450+, 650+, 800+).',
                    'Hoàn toàn không cần cài đặt thêm từ điển hay phần mềm thứ 3.',
                    'Giao diện hiện đại, tập trung cao độ, không quảng cáo làm phiền.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
