import type { UserResponse } from '@/types/user.types'
import {
  BarChart2,
  Bell,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  GalleryHorizontalEnd,
  Headphones,
  HelpCircle,
  Layers,
  LayoutDashboard,
  PenLine,
  Receipt,
  RefreshCw,
  Settings,
  Settings2,
  Shield,
  Users,
  Wallet,
} from 'lucide-react'

//Menu học viên
const LEARNER_SIDEBAR = [
  {
    label: 'Chính',
    items: [{ to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'Từ vựng',
    items: [
      { to: '/vocabulary', icon: BookOpen, label: 'Từ vựng' },
      { to: '/vocabulary/flashcard', icon: Layers, label: 'Flashcard' },
      { to: '/vocabulary/review', icon: RefreshCw, label: 'Ôn tập SRS' },
    ],
  },
  {
    label: 'Luyện tập',
    items: [
      { to: '/exercise', icon: PenLine, label: 'Luyện đọc' },
      { to: '/listening', icon: Headphones, label: 'Luyện nghe' },
    ],
  },
]

//Menu quản trị viên
const ADMIN_SIDEBAR = [
  {
    label: 'Main',
    items: [{ to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },

  {
    label: 'Users',
    items: [
      { to: '/admin/users', icon: Users, label: 'Danh sách người dùng' },
      { to: '/admin/roles', icon: Shield, label: 'Vai trò và phân quyền' },
    ],
  },

  {
    label: 'Content',
    items: [
      { to: '/admin/word-set', icon: BookOpen, label: 'Quản lý từ vựng' },
      { to: '/admin/grammar', icon: FileText, label: 'Quản lý ngữ pháp' },
      { to: '/admin/listening', icon: Headphones, label: 'Quản lý bài nghe' },
      { to: '/admin/reading', icon: PenLine, label: 'Quản lý bài đọc' },
    ],
  },

  {
    label: 'Tests',
    items: [
      { to: '/admin/tests', icon: ClipboardList, label: 'Bộ đề thi' },
      { to: '/admin/questions', icon: HelpCircle, label: 'Ngân hàng câu hỏi' },
    ],
  },

  {
    label: 'Analytics',
    items: [{ to: '/admin/analytics', icon: BarChart2, label: 'Báo cáo' }],
  },

  {
    label: 'Billing',
    items: [
      { to: '/admin/plans', icon: CreditCard, label: 'Plans' },
      { to: '/admin/payments', icon: Receipt, label: 'Phương thức thanh toán' },
    ],
  },

  {
    label: 'System',
    items: [
      { to: '/admin/notifications', icon: Bell, label: 'Thông báo' },
      { to: '/admin/settings', icon: Settings, label: 'Cài đặt chung' },
    ],
  },
]

//Menu Profile học viên
const LEARNER_PROFILE_SIDEBAR = [
  {
    label: 'Information',
    items: [{ to: '/profile/information', icon: LayoutDashboard, label: 'Thông tin cá nhân' }],
  },
  {
    label: 'Settings',
    items: [{ to: '/profile/settings', icon: Settings2, label: 'Cài đặt chung' }],
  },
  {
    label: 'Learning Progress',
    items: [{ to: '/profile/progress', icon: CalendarCheck, label: 'Tiến trình học' }],
  },
  {
    label: 'Test History',
    items: [{ to: '/profile/history', icon: GalleryHorizontalEnd, label: 'Lịch sử làm bài' }],
  },

  {
    label: 'Security',
    items: [{ to: '/profile/security', icon: Settings2, label: 'Bảo mật' }],
  },
  {
    label: 'Billing',
    items: [{ to: '/profile/billing', icon: Wallet, label: 'Gói học' }],
  },
]

//Menu profile admin
const ADMIN_PROFILE_SIDEBAR = [
  {
    label: 'Information',
    items: [{ to: '/profile/information', icon: LayoutDashboard, label: 'Thông tin cá nhân' }],
  },
  {
    label: 'Security',
    items: [{ to: '/profile/security', icon: Settings2, label: 'Bảo mật' }],
  },
  {
    label: 'Settings',
    items: [{ to: '/profile/setting', icon: Settings2, label: 'Cài đặt' }],
  },
]

export const GetSideBar = (user: UserResponse | null) => {
  return user?.Role === 'User' ? LEARNER_SIDEBAR : ADMIN_SIDEBAR
}

export const GetProfileSidebar = (user: UserResponse | null) => {
  return user?.Role === 'User' ? LEARNER_PROFILE_SIDEBAR : ADMIN_PROFILE_SIDEBAR
}
