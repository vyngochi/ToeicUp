import ChangePassword from '@/features/profile/components/profile-security/ChangePassword'
import { Smartphone, Key, Activity, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function SecurityPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="mt-15 space-y-6 px-5 py-8 sm:px-8 md:px-12">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Bảo mật</h1>
            <p className="text-muted-foreground text-sm">
              Quản lý mật khẩu và cài đặt bảo mật tài khoản của bạn
            </p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3"
          onClick={() => toggleSection('password')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2.5">
              <Key className="text-primary h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Đổi mật khẩu</h3>
              <p className="text-muted-foreground text-sm">Cập nhật mật khẩu tài khoản của bạn</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'password' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'password' && (
          <div className="border-t p-6">
            <ChangePassword />
          </div>
        )}
      </Card>

      {/* Two-Factor Authentication Section */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3"
          onClick={() => toggleSection('2fa')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2.5 dark:bg-orange-900/30">
              <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold">Xác minh 2 lớp (2FA)</h3>
              <p className="text-muted-foreground text-sm">
                Bảo vệ tài khoản bằng xác minh hai bước
              </p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === '2fa' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === '2fa' && (
          <div className="space-y-6 border-t p-6">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-muted-foreground text-sm">
                Thêm lớp bảo mật bổ sung cho tài khoản của bạn. Khi bật, bạn sẽ cần nhập mã xác minh
                từ ứng dụng authenticator hoặc SMS.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Phương pháp 2FA</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Smartphone className="mr-2 h-4 w-4" />
                  Xác minh qua SMS
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Key className="mr-2 h-4 w-4" />
                  Ứng dụng Authenticator
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">Hủy</Button>
              <Button disabled>Thiết lập 2FA</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Active Sessions / Device Management */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3"
          onClick={() => toggleSection('devices')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-900/30">
              <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold">Thiết bị hoạt động</h3>
              <p className="text-muted-foreground text-sm">Quản lý các phiên đăng nhập hiện hoạt</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'devices' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'devices' && (
          <div className="space-y-4 border-t p-6">
            {/* Current Device */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Chrome on Windows</h4>
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                      Hiện tại
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">192.168.1.1 • Vietnam</p>
                  <p className="text-muted-foreground text-xs">Đăng nhập: 30 phút trước</p>
                </div>
              </div>
            </div>

            {/* Other Devices */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Thiết bị khác</h4>
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Safari on iPhone</h4>
                    <p className="text-muted-foreground text-sm">192.168.1.50 • Vietnam</p>
                    <p className="text-muted-foreground text-xs">Đăng nhập: 2 ngày trước</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Đăng xuất tất cả các phiên
            </Button>
          </div>
        )}
      </Card>

      {/* Login Activity */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3"
          onClick={() => toggleSection('activity')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2.5 dark:bg-indigo-900/30">
              <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold">Lịch sử đăng nhập</h3>
              <p className="text-muted-foreground text-sm">Theo dõi hoạt động đăng nhập gần đây</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'activity' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'activity' && (
          <div className="space-y-3 border-t p-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-accent flex items-center justify-between rounded-lg p-3">
                <div className="space-y-1">
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-muted-foreground text-xs">192.168.1.{i} • Vietnam</p>
                </div>
                <p className="text-muted-foreground text-xs">{i} ngày trước</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
