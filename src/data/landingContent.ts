export interface HeroContent {
  badge: string
  heading: string
  headingHighlight1: string
  headingHighlight2: string
  subtext: string
  ctaPrimary: string
  ctaSecondary: string
  stats: Array<{
    data: string
    label: string
    isBorder: boolean
  }>
}

export const defaultHeroContent: HeroContent = {
  badge: 'Tích hợp AI',
  heading: 'Chinh phục TOEIC với',
  headingHighlight1: 'AI thông minh',
  headingHighlight2: 'SRS',
  subtext:
    'Học từ vựng hiệu quả, luyện đề Reading & Listening với AI và nhận giải thích tiếng Việt chi tiết.',
  ctaPrimary: 'Bắt đầu miễn phí',
  ctaSecondary: 'Xem Demo',
  stats: [
    { data: '10,000+', label: 'Từ vựng TOEIC', isBorder: true },
    { data: '1,000+', label: 'Người học', isBorder: true },
    { data: '+100', label: 'Điểm tăng trung bình', isBorder: true },
    { data: '4.9', label: 'Đánh giá', isBorder: false },
  ],
}
