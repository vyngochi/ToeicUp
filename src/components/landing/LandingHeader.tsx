import { Button } from '../ui/button'
import * as S from './styles/Header.styled'
import { LayoutPanelLeft } from 'lucide-react'
import { generateLogo } from '@/utils/generateLogoByTheme'
import { useScrolled } from '@/hooks/systems/useScroll'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { DropdownMenuBasic } from '../common/LandingDropdown'

interface MenuList {
  id: number
  screenId: string
  label: string
  path?: string
}

const headerMenuList: MenuList[] = [
  { id: 1, screenId: 'feature', label: 'Tính năng', path: '' },
  { id: 1, screenId: 'works', label: 'Cách hoạt động', path: '' },
  { id: 1, screenId: 'faq', label: 'FAQ', path: '' },
]

export default function LandingHeader() {
  const scrolled = useScrolled()
  const navigate = useNavigate()

  return (
    <S.HeaderWrapper
      scrolled={scrolled}
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass  border-b-0'
          : 'bg-transparent border-transparent',
      )}
    >
      <img className="h-auto w-15 md:h-auto md:w-20" src={generateLogo()} />
      <div className="hidden list-none font-bold sm:flex sm:gap-8 sm:text-[14px] md:gap-15 md:text-[16px] lg:gap-30">
        {headerMenuList.map((menu) => (
          <a
            href={`#${menu.screenId}`}
            key={menu.label}
            className="hover:cursor-pointer hover:text-amber-400"
          >
            {menu.label}
          </a>
        ))}
      </div>
      <div className="hidden sm:flex sm:gap-1">
        <Button className="w-25 bg-(--color-navy-600) font-bold" onClick={() => navigate('/login')}>
          Đăng nhập
        </Button>
        <Button
          className="w-25 bg-(--color-blue-600) font-bold"
          onClick={() => navigate('/register')}
        >
          Đăng ký
        </Button>
      </div>
      <DropdownMenuBasic>
        <LayoutPanelLeft className="font-bold hover:text-amber-400 sm:hidden" />
      </DropdownMenuBasic>
    </S.HeaderWrapper>
  )
}
