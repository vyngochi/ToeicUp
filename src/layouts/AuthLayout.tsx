import { AuthenticationTabs } from '@/components/common/AuthenticationTabs'
import { Button } from '@/components/ui/button'
import { generateLogo } from '@/utils/generateLogoByTheme'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const logo = generateLogo()
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
  const logo = generateLogo()
  const navigate = useNavigate()
  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between p-5 md:px-10">
        <Button variant={'outline'} onClick={() => navigate('/')}>
          Trở lại
        </Button>
        <img src={logo} alt="authen-logo" className="h-15 w-20" />
      </div>
      <div className="mt-[30%] flex justify-center md:mt-[15%] lg:mt-[10%]">
        <Outlet />
      </div>
    </div>
  )
}
