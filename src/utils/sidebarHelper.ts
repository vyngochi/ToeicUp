import type { UserResponse } from '@/types/user.types'
import {
  BarChart2,
  Bell,
  BookOpen,
  ClipboardList,
  CreditCard,
  FileText,
  Headphones,
  HelpCircle,
  Layers,
  LayoutDashboard,
  PenLine,
  Receipt,
  RefreshCw,
  Settings,
  Shield,
  Users,
} from 'lucide-react'

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
      { to: '/exercise', icon: PenLine, label: 'Reading' },
      { to: '/listening', icon: Headphones, label: 'Listening' },
    ],
  },
  {
    label: 'Analytics',
    items: [{ to: '/statistics', icon: BarChart2, label: 'Thống kê' }],
  },
]

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

export const GetSideBar = (user: UserResponse | null) => {
  return user?.Role === 'User' ? LEARNER_SIDEBAR : ADMIN_SIDEBAR
}
