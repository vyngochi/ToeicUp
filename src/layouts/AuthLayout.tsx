import { AuthenticationTabs } from '@/components/common/AuthenticationTabs'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/global/themeStore'
import { generateLogo } from '@/utils/generateLogoByTheme'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const { theme } = useThemeStore()
  const logo = generateLogo(theme)
  const navigate = useNavigate()
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-5 md:px-10">
        <Button variant={'outline'} onClick={() => navigate('/')}>
          Trở lại
        </Button>
        <img src={logo} alt="authen-logo" className="h-15 w-20" />
      </div>
      <AuthenticationTabs>
        <Outlet />
      </AuthenticationTabs>
    </div>
  )
}

export const AuthLayoutNoTabs = () => {
  const { theme } = useThemeStore()
  const logo = generateLogo(theme)
  const navigate = useNavigate()
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-5 md:px-10">
        <Button variant={'outline'} onClick={() => navigate('/')}>
          Trở lại
        </Button>
        <img src={logo} alt="authen-logo" className="h-15 w-20" />
      </div>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  )
}
