// src/layouts/MainLayout.tsx
import { AppSidebar } from '@/components/common/AppSidebar'
import { DropdownMenuAvatar } from '@/components/common/ProfileAvatar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { StreakIcon } from '@/components/common/StreakIcon'
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
        <header className="bg-sidebar sticky top-0 z-10 flex h-13 w-full items-center justify-between border-b border-gray-200 px-4">
          <SidebarTrigger />
          <div className="flex gap-5 items-center">
            <StreakIcon />
            <DropdownMenuAvatar />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <TargetDialog isOpen={isSettingGoal} onOpenChange={setIsSettingGoal}>
            <Outlet />
          </TargetDialog>
        </div>
      </main>
    </SidebarProvider>
  )
}
