import { Separator } from '../ui/separator'
import { generateLogo } from '@/utils/generateLogoByTheme'
import { Copyright } from 'lucide-react'

interface FooterMenu {
  title: string
  content: string[]
}

const WebsiteMenu: FooterMenu = {
  title: 'Website',
  content: ['Tính năng', 'Cách hoạt động', 'FAQ'],
}

const PolicyMenu: FooterMenu = {
  title: 'Pháp lý',
  content: ['Điều khoản', 'Bảo mật', 'Cookies'],
}

export default function LandingFooter() {
  return (
    <div className="mt-10 flex justify-center bg-gray-50/50 py-12">
      <div className="w-full max-w-6xl px-6 md:px-12">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-5">
            <img src={generateLogo()} alt="logo-footer" className="mb-6 w-20 md:w-24" />
            <div className="text-sm leading-relaxed text-gray-600 max-w-sm">
              Nền tảng học từ vựng và luyện thi TOEIC thông minh với AI. Giúp bạn đạt điểm mục tiêu
              nhanh hơn.
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-3">
            <FooterMenu menu={WebsiteMenu} />
          </div>
          <div className="md:col-span-3 lg:col-span-4">
            <FooterMenu menu={PolicyMenu} />
          </div>
        </div>

        <Separator className="bg-gray-200" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Copyright className="h-4 w-4" />
            <span>2026 TOEICUp. All rights reserved.</span>
          </div>
          <a
            href="https://www.google.com/"
            target="_blank"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            Made by vyngochi & vangiuphan
          </a>
        </div>
      </div>
    </div>
  )
}

const FooterMenu = ({ menu }: { menu: FooterMenu }) => {
  return (
    <div>
      <h6 className="mb-4 font-semibold text-gray-900">{menu.title}</h6>
      <div className="flex flex-col gap-3">
        {menu.content.map((item, idx) => (
          <span
            className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-blue-600"
            key={idx}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
