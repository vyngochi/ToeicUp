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
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  RefreshCw,
  PenLine,
  Headphones,
  BarChart2,
  User,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useThemeStore } from '@/stores/global/themeStore'
import { generateLogo } from '@/utils/generateLogoByTheme'

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [{ to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'Vocabulary',
    items: [
      { to: '/vocabulary', icon: BookOpen, label: 'Từ vựng' },
      { to: '/vocabulary/flashcard', icon: Layers, label: 'Flashcard' },
      { to: '/vocabulary/review', icon: RefreshCw, label: 'Ôn tập SRS' },
    ],
  },
  {
    label: 'Exercise',
    items: [
      { to: '/exercise', icon: PenLine, label: 'Reading' },
      { to: '/listening', icon: Headphones, label: 'Listening' },
    ],
  },
  {
    label: 'Analytics',
    items: [{ to: '/statistics', icon: BarChart2, label: 'Thống kê' }],
  },
]

export function AppSidebar() {
  const user = useAuthStore((s) => s.user)
  const theme = useThemeStore((s) => s.theme)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex cursor-pointer items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border p-0.5">
                  <img src={generateLogo(theme)} alt="" />
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
              {section.items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) => (isActive ? 'font-medium text-blue-600' : '')}
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Hồ sơ">
              <NavLink to="/profile">
                <>
                  <User />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{user?.displayName ?? 'User'}</span>
                    <span className="text-[10px] text-gray-400">{user?.email}</span>
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
