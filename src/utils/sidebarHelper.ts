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
  Goal,
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
    label: 'Main',
    items: [{ to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'Vocabulary',
    items: [
      { to: '/vocabulary', icon: BookOpen, label: 'Từ vựng' },
      { to: '/vocabulary/flashcard', icon: Layers, label: 'Flashcard' },
      { to: '/vocabulary/review', icon: RefreshCw, label: 'Ôn tập SRS' },
    ],
  },
  {
    label: 'Exercise',
    items: [
      { to: '/exercise', icon: PenLine, label: 'Luyện đọc' },
      { to: '/listening', icon: Headphones, label: 'Luyện nghe' },
    ],
  },
  {
    label: 'Analytics',
    items: [{ to: '/statistics', icon: BarChart2, label: 'Thống kê' }],
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
      { to: '/admin/users', icon: Users, label: 'All Users' },
      { to: '/admin/roles', icon: Shield, label: 'Roles & Permissions' },
    ],
  },

  {
    label: 'Content',
    items: [
      { to: '/admin/vocabulary', icon: BookOpen, label: 'Vocabulary' },
      { to: '/admin/grammar', icon: FileText, label: 'Grammar' },
      { to: '/admin/listening', icon: Headphones, label: 'Listening' },
      { to: '/admin/reading', icon: PenLine, label: 'Reading' },
    ],
  },

  {
    label: 'Tests',
    items: [
      { to: '/admin/tests', icon: ClipboardList, label: 'Test Sets' },
      { to: '/admin/questions', icon: HelpCircle, label: 'Question Bank' },
    ],
  },

  {
    label: 'Analytics',
    items: [{ to: '/admin/analytics', icon: BarChart2, label: 'Reports' }],
  },

  {
    label: 'Billing',
    items: [
      { to: '/admin/plans', icon: CreditCard, label: 'Plans' },
      { to: '/admin/payments', icon: Receipt, label: 'Payments' },
    ],
  },

  {
    label: 'System',
    items: [
      { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
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
    label: 'Learning Goals',
    items: [{ to: '/profile/goal', icon: Goal, label: 'Mục tiêu học tập' }],
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
    label: 'Settings',
    items: [{ to: '/profile/setting', icon: Settings2, label: 'Cài đặt' }],
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
