import { useThemeStore } from '@/stores/global/themeStore'
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
  const { theme } = useThemeStore()
  return (
    <div className="mt-5 flex justify-center">
      <div className="max-w-[70%] flex-col md:max-w-[80%]">
        <div className="grid-row-[2fr_1fr_1fr] mb-10 grid gap-3 md:grid-cols-[2fr_1fr_1fr] md:gap-4">
          <div className="lg:w-[60%]">
            <img src={generateLogo(theme)} alt="logo-footer" className="mb-2 w-14 md:w-20" />
            <div className="text-justify text-[12px] text-gray-700 md:text-sm">
              Nền tảng học từ vựng và luyện thi TOEIC thông minh với AI. Giúp bạn đạt điểm mục tiêu
              nhanh hơn.
            </div>
          </div>
          <FooterMenu menu={WebsiteMenu} />
          <FooterMenu menu={PolicyMenu} />
        </div>

        <Separator />
        <div className="flex items-center justify-center gap-1 p-2">
          <Copyright className="h-3 w-3 text-gray-400" />
          <a
            href="https://www.google.com/"
            target="_blank"
            className="text-[10px] text-gray-400 md:text-[12px]"
          >
            2026 TOEICUp. Made by vyngochi & vangiuphan
          </a>
        </div>
      </div>
    </div>
  )
}

const FooterMenu = ({ menu }: { menu: FooterMenu }) => {
  return (
    <div className="">
      <h6>{menu.title}</h6>
      <div className="flex flex-col md:mt-5 md:gap-3">
        {menu.content.map((item, idx) => (
          <span
            className="cursor-pointer text-[12px] text-gray-600 hover:text-amber-400 md:text-sm"
            key={idx}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
