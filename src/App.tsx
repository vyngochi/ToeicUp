import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useThemeStore } from './stores/themeStore'
import { useEffect } from 'react'

function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <RouterProvider router={router} />
}

export default App
