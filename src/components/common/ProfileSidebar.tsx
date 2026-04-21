import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/global/authStore'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { useThemeStore } from '@/stores/global/themeStore'
// import { generateLogo } from '@/utils/generateLogoByTheme'
import { GetProfileSidebar } from '@/utils/sidebarHelper'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { TooltipCommon } from '../ui/tooltip'

export function ProfileSidebar() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  //   const theme = useThemeStore((s) => s.theme)
  const NAV_SECTIONS = GetProfileSidebar(user)
  const isActive = (path: string) => (location.pathname.includes(path) ? true : false)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent hover:text-inherit"
            >
              <div className="flex cursor-pointer items-center gap-2.5">
                <TooltipCommon text="Trở lại trang chủ">
                  <Button
                    onClick={() => navigate('/')}
                    variant={'outline'}
                    size={'icon-sm'}
                    className="text-xs"
                  >
                    <ArrowLeft />
                  </Button>
                </TooltipCommon>
                <span className="font-bold text-gray-900">Tài khoản</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_SECTIONS.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.to}
                      end
                      className={cn(isActive(item.to) ? 'font-bold text-blue-600' : '')}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
