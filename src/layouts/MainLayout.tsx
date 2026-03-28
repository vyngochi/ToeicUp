// src/layouts/MainLayout.tsx
import { AppSidebar } from '@/components/common/AppSidebar'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <header className="bg-sidebar flex h-13 items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>TUP</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
