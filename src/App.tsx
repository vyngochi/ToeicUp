import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import { useThemeStore } from './stores/global/themeStore'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useInitAuth } from './hooks/auth/useInitAuth'
import LazySpinner from './components/common/LazySpinner'
import { TooltipProvider } from './components/ui/tooltip'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient()

function AppContent() {
  const { isPending } = useInitAuth()

  if (isPending) return <LazySpinner name="Toeic Up" />

  return <RouterProvider router={router} />
}

function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
          <Toaster position="top-center" className="font-family" />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
