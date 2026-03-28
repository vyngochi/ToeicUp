import { useThemeStore } from '@/stores/themeStore'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useThemeStore((s) => s.theme)

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group font-family"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          // ── Surface ──
          '--normal-bg': 'var(--color-card)',
          '--normal-text': 'var(--color-card-foreground)',
          '--normal-border': 'var(--color-border)',

          // ── Success — green ──
          '--success-bg': 'var(--color-green-50)',
          '--success-text': 'var(--color-green-800)',
          '--success-border': 'var(--color-green-200)',

          // ── Info — blue ──
          '--info-bg': 'var(--color-blue-50)',
          '--info-text': 'var(--color-blue-800)',
          '--info-border': 'var(--color-blue-200)',

          // ── Warning — amber ──
          '--warning-bg': 'var(--color-amber-50)',
          '--warning-text': 'var(--color-amber-800)',
          '--warning-border': 'var(--color-amber-200)',

          // ── Error — red ──
          '--error-bg': 'var(--color-red-50)',
          '--error-text': 'var(--color-red-800)',
          '--error-border': 'var(--color-red-200)',

          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
          title: 'font-medium text-sm font-family',
          description: 'text-xs opacity-80 font-family',
          actionButton: 'bg-navy-900 text-white text-xs rounded-lg px-3 py-1.5 font-medium',
          cancelButton: 'bg-gray-100 text-gray-700 text-xs rounded-lg px-3 py-1.5',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
