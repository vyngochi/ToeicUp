import {
  Bell,
  ShieldCheck,
  Target,
  Palette,
  Database,
  ChevronRight,
  Mail,
  Smartphone,
  Globe,
  Eye,
} from 'lucide-react'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ProfileSettings() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [dailyGoal, setDailyGoal] = useState([20])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="space-y-6">
      {/* Mục tiêu học tập */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3 transition-colors"
          onClick={() => toggleSection('goals')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2.5 dark:bg-green-900/30">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">Mục tiêu học tập</h3>
              <p className="text-muted-foreground text-sm">
                Thiết lập mục tiêu từ vựng hàng ngày của bạn
              </p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'goals' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'goals' && (
          <div className="space-y-6 border-t p-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Số từ vựng mới mỗi ngày</Label>
                <span className="text-primary text-lg font-bold">{dailyGoal} từ</span>
              </div>
              <Slider
                value={dailyGoal}
                onValueChange={setDailyGoal}
                max={40}
                step={5}
                className="w-full"
              />
              <p className="text-muted-foreground text-xs italic">
                * Gợi ý: 20-30 từ mỗi ngày là mức độ phù hợp để duy trì trí nhớ lâu dài.
              </p>
            </div>
            <Button className="w-full sm:w-auto">Lưu thay đổi</Button>
          </div>
        )}
      </Card>

      {/* Thông báo */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3 transition-colors"
          onClick={() => toggleSection('notifications')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/30">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Thông báo</h3>
              <p className="text-muted-foreground text-sm">
                Quản lý cách chúng tôi liên lạc với bạn
              </p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'notifications' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'notifications' && (
          <div className="space-y-4 border-t p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <Label className="text-base">Thông báo qua Email</Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  Nhận báo cáo học tập hàng tuần và cập nhật mới nhất
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-muted-foreground h-4 w-4" />
                  <Label className="text-base">Thông báo đẩy (Push)</Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  Lời nhắc học tập và ôn tập SRS trên trình duyệt/điện thoại
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        )}
      </Card>

      {/* Quyền riêng tư */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3 transition-colors"
          onClick={() => toggleSection('privacy')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-100 p-2.5 dark:bg-yellow-900/30">
              <ShieldCheck className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold">Quyền riêng tư</h3>
              <p className="text-muted-foreground text-sm">Kiểm soát thông tin hiển thị của bạn</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'privacy' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'privacy' && (
          <div className="space-y-4 border-t p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Eye className="text-muted-foreground h-4 w-4" />
                  <Label className="text-base">Hồ sơ công khai</Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  Cho phép người khác tìm thấy và xem tiến độ học tập của bạn
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Globe className="text-muted-foreground h-4 w-4" />
                  <Label className="text-base">Hiển thị trên bảng xếp hạng</Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  Tên của bạn sẽ xuất hiện trên bảng xếp hạng học tập hàng tuần
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        )}
      </Card>

      {/* Giao diện & Ngôn ngữ */}
      <Card className="overflow-hidden">
        <div
          className="flex cursor-pointer items-center justify-between p-3 transition-colors"
          onClick={() => toggleSection('appearance')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-900/30">
              <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold">Giao diện & Ngôn ngữ</h3>
              <p className="text-muted-foreground text-sm">Tùy chỉnh trải nghiệm xem của bạn</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'appearance' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'appearance' && (
          <div className="space-y-6 border-t p-3">
            <div className="flex items-center justify-between">
              <Label className="text-base">Ngôn ngữ ứng dụng</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Tiếng Việt
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
                  <DropdownMenuItem>English (Coming soon)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Phông chữ hiển thị</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="font-sans">
                  Sans-serif
                </Button>
                <Button variant="outline" size="sm" className="font-serif">
                  Serif
                </Button>
                <Button variant="outline" size="sm" className="font-mono">
                  Mono
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Dữ liệu & Tài khoản */}
      <Card className="border-destructive/20 overflow-hidden">
        <div
          className="hover:bg-destructive/5 flex cursor-pointer items-center justify-between p-3 transition-colors"
          onClick={() => toggleSection('account')}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2.5 dark:bg-red-900/30">
              <Database className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-destructive font-semibold">Dữ liệu & Tài khoản</h3>
              <p className="text-muted-foreground text-sm">Quản lý dữ liệu và xóa tài khoản</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${
              expandedSection === 'account' ? 'rotate-90' : ''
            }`}
          />
        </div>
        {expandedSection === 'account' && (
          <div className="space-y-4 border-t p-3">
            <div className="border-border flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h4 className="font-medium">Xuất dữ liệu học tập</h4>
                <p className="text-muted-foreground text-sm">
                  Tải xuống toàn bộ lịch sử học tập và từ vựng của bạn (CSV)
                </p>
              </div>
              <Button variant="outline" size="sm">
                Xuất CSV
              </Button>
            </div>

            <div className="border-destructive/20 bg-destructive/5 flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h4 className="text-destructive font-medium">Xóa tài khoản</h4>
                <p className="text-muted-foreground text-sm italic">
                  Hành động này không thể hoàn tác. Toàn bộ dữ liệu sẽ bị xóa vĩnh viễn.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Xóa vĩnh viễn
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
