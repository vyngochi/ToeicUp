import { Button } from '../ui/button'
import * as S from './styles/Header.styled'
import Logo from '@/assets/images/toeicup-logo.png'
import { LayoutPanelLeft } from 'lucide-react'

interface MenuList {
  id: number
  screenId: string
  label: string
  path?: string
}

export default function LandingHeader() {
  const headerMenuList: MenuList[] = [
    { id: 1, screenId: 'feature', label: 'Tính năng', path: '' },
    { id: 1, screenId: 'works', label: 'Cách hoạt động', path: '' },
    { id: 1, screenId: 'faq', label: 'FAQ', path: '' },
  ]
  return (
    <S.HeaderWrapper>
      <img className="h-auto w-15 md:h-auto md:w-20" src={Logo} />
      <div className="hidden list-none font-bold sm:flex sm:gap-8 sm:text-[14px] md:gap-15 md:text-[16px] lg:gap-30">
        {headerMenuList.map((menu) => (
          <a
            href={`#${menu.screenId}`}
            key={menu.id}
            className="hover:cursor-pointer hover:text-amber-400"
          >
            {menu.label}
          </a>
        ))}
      </div>
      <div className="hidden sm:flex sm:gap-1">
        <Button className="w-25 bg-(--color-navy-600) font-bold">Đăng nhập</Button>
        <Button className="w-25 bg-(--color-blue-600) font-bold">Đăng ký</Button>
      </div>
      <LayoutPanelLeft className="font-bold hover:text-amber-400 sm:hidden" />
    </S.HeaderWrapper>
  )
}
