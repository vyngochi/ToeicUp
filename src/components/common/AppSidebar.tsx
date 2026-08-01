import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/global/authStore'
import { User } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { generateLogo } from '@/utils/generateLogoByTheme'
import { GetSideBar } from '@/utils/sidebarHelper'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const NAV_SECTIONS = GetSideBar(user)

  return (
    <Sidebar className="z-1001" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent hover:text-inherit"
            >
              <div className="flex cursor-pointer items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border p-0.5">
                  <img src={generateLogo()} alt="ToeicUp logo" />
                </div>
                <span className="font-bold text-gray-900">TOEIC Up</span>
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
              {section.items.map((item) => {
                let isItemActive = false
                if (item.to === '/vocabulary') {
                  isItemActive =
                    location.pathname === '/vocabulary' || location.pathname.includes('/word-set')
                } else if (item.to === '/admin/word-set') {
                  isItemActive =
                    location.pathname === '/admin/word-set' ||
                    location.pathname.includes('/admin/word-set')
                } else {
                  isItemActive = location.pathname.includes(item.to)
                }

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={item.label} isActive={isItemActive}>
                      <NavLink
                        to={item.to}
                        end
                        className={cn(isItemActive ? 'text-orange-600!' : '')}
                      >
                        <item.icon />
                        <span className={cn(isItemActive ? 'font-bold text-orange-600!' : '')}>
                          {item.label}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Hồ sơ">
              <NavLink to="/profile">
                <>
                  <User />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{user?.DisplayName ?? 'User'}</span>
                    <span className="text-[10px] text-gray-400">{user?.Email}</span>
                  </div>
                </>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
