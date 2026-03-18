import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '../ui/button'
interface InfoBadgeType {
  data: number
  label: string
  isBorder: boolean
  icon?: React.ReactNode
}
export default function HeroSection() {
  const InfoBadge: InfoBadgeType[] = [
    { data: 10000, label: 'Tự vựng TOEIC', isBorder: true },
    { data: 1000, label: 'Người học', isBorder: true },
    { data: 100, label: 'Điểm tăng trung bình', isBorder: true },
    { data: 4.9, label: 'Đánh giá', isBorder: false, icon: <Star size={15} /> },
  ]
  return (
    <div className="m-5 md:m-20 md:mt-5 lg:m-40 lg:mt-15">
      <div className="flex items-center justify-center md:pb-1">
        <div className="w-max rounded-2xl border border-blue-200 bg-blue-50 pr-2 pl-2 text-[12px] font-bold text-blue-400">
          Tích hợp AI
        </div>
      </div>
      <div className="text-center align-middle text-[28px] font-bold md:mb-5 md:text-5xl lg:text-6xl">
        Chinh phục TOEIC với{' '}
        <div>
          <span className="text-blue-600">AI thông minh</span> và{' '}
          <span className="text-red-600">SRS</span>
        </div>
      </div>
      <div className="mr-7 ml-7 pb-10 text-justify text-sm md:text-center md:text-[15px] lg:mr-20 lg:ml-20 lg:text-[20px] xl:mr-45 xl:ml-45">
        Học từ vựng hiệu quả, luyện đề Reading & Listening với AI và nhận giải thích tiếng Việt chi
        tiết. Giúp bạn cải thiện điểm TOEIC nhanh hơn.
      </div>
      <div className="mb-2 flex items-center justify-center gap-2">
        <Button variant={'outline'} size={'default'}>
          Bắt đầu miễn phí <ArrowRight />
        </Button>
        <Button variant={'outline'} size={'default'}>
          <Play />
          Xem Demo
        </Button>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-items-center gap-2 md:grid-cols-4 lg:mt-10">
        {InfoBadge.map((item) => (
          <div className={`w-18 flex-col lg:w-30`}>
            <div className="flex items-center gap-1 font-semibold md:text-[20px] lg:text-[30px]">
              {item.data} {item.icon ? item.icon : null}
            </div>
            <div className="text-[8px] lg:text-[14px]">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
