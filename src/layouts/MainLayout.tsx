// src/layouts/MainLayout.tsx
import { AppSidebar } from '@/components/common/AppSidebar'
import { DropdownMenuAvatar } from '@/components/common/ProfileAvatar'
import ThemeToggle from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TargetDialog } from '@/features/authentication/components/TargetDialog'
import { useAuthStore } from '@/stores/global/authStore'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const isSettingGoal = useAuthStore((s) => s.isSettingGoal)
  const setIsSettingGoal = useAuthStore((s) => s.setIsSettingGoal)

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <header className="bg-sidebar fixed right-0 left-0 z-1000 flex h-13 items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <div className="flex gap-5">
            <ThemeToggle />
            <DropdownMenuAvatar />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <TargetDialog isOpen={isSettingGoal} onOpenChange={setIsSettingGoal}>
            <Outlet />
          </TargetDialog>
        </div>
      </main>
    </SidebarProvider>
  )
}
