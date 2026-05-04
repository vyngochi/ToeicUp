import { DropdownMenuAvatar } from '@/components/common/ProfileAvatar'
import { ProfileSidebar } from '@/components/common/ProfileSidebar'
import ThemeToggle from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <SidebarProvider>
      <ProfileSidebar />
      <main className="flex flex-1 flex-col">
        <header className="bg-sidebar fixed right-0 left-0 z-1000 flex h-13 items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <div className="flex gap-5">
            <ThemeToggle />
            <DropdownMenuAvatar />
          </div>
        </header>
        <div className="flex-1 justify-center overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
