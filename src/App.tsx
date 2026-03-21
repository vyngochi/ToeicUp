import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import { useThemeStore } from './stores/global/themeStore'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
