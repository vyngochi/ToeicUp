import { DropdownMenuAvatar } from '@/components/common/ProfileAvatar'
import { ProfileSidebar } from '@/components/common/ProfileSidebar'
import ThemeToggle from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <SidebarProvider>
      <ProfileSidebar />
      <main className="relative flex flex-1 flex-col">
        <header className="bg-sidebar sticky top-0 z-10 flex h-13 w-full items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <div className="flex gap-5">
            <ThemeToggle />
            <DropdownMenuAvatar />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
