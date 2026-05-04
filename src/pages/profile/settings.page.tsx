import ProfileSettings from '@/features/profile/components/profile-settings/ProfileSettings'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="mt-15 space-y-6 px-5 py-8 sm:px-8 md:px-12">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2.5">
            <Settings className="text-primary h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Cài đặt</h1>
            <p className="text-muted-foreground text-sm">
              Cá nhân hóa trải nghiệm học tập và quản lý tài khoản của bạn
            </p>
          </div>
        </div>
      </div>

      <ProfileSettings />
    </div>
  )
}
