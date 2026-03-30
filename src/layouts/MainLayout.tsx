// src/layouts/MainLayout.tsx
import { AppSidebar } from '@/components/common/AppSidebar'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TargetDialog } from '@/features/authentication/components/TargetDialog'
import { useAuthStore } from '@/stores/global/authStore'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const isLoggedWithGG = useAuthStore((s) => s.isLoggedWithGG)
  const setIsLoggedWithGG = useAuthStore((s) => s.setIsLoggedWithGG)
  const user = useAuthStore((s) => s.user)

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <header className="bg-sidebar flex h-13 items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <Avatar>
            <AvatarImage src={user?.avatarUrl ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>TUP</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </header>
        <div className="flex-1 overflow-y-auto">
          <TargetDialog isOpen={isLoggedWithGG} onOpenChange={setIsLoggedWithGG}>
            <Outlet />
          </TargetDialog>
        </div>
      </main>
    </SidebarProvider>
  )
}
