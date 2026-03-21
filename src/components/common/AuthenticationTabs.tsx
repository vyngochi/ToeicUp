import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface Tab {
  id: number
  value: string
  label: string
}

const TABS: Tab[] = [
  { id: 1, value: 'login', label: 'Đăng nhập' },
  { id: 2, value: 'register', label: 'Đăng ký' },
  { id: 3, value: 'forgot-password', label: 'Quên mật khẩu' },
]

export function AuthenticationTabs() {
  const navigate = useNavigate()
  const location = useLocation()

  const getTabName = () => {
    return location.pathname.includes('login')
      ? 'login'
      : location.pathname.includes('register')
        ? 'register'
        : 'forgot'
  }
  return (
    <Tabs className="flex w-full items-center justify-center p-3" value={getTabName()}>
      <TabsList className="mb-1">
        {TABS.map((tab) => (
          <TabsTrigger
            className="text-xs sm:text-sm"
            key={tab.id}
            value={tab.value}
            onClick={() => navigate(`/${tab.value}`)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <Outlet />
    </Tabs>
  )
}
