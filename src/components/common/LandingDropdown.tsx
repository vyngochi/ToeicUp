import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, SunMedium } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface LandingDropdownProps {
  children: React.ReactNode
  theme: string
  toggleTheme: () => void
}

export function DropdownMenuBasic({ children, theme, toggleTheme }: LandingDropdownProps) {
  const navigate = useNavigate()
  const themeIcon = () => {
    return theme === 'dark' ? (
      <>
        <SunMedium /> Light mode
      </>
    ) : (
      <>
        <Moon /> Dark mode
      </>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-100">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate('/login')}>Đăng nhập</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/register')}>Đăng ký</DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>{themeIcon()}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
