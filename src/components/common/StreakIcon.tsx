import { Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/global/authStore'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function StreakIcon() {
  const user = useAuthStore((s) => s.user)
  // Check if LastStudyDate is today
  const hasStudiedToday = () => {
    if (!user?.LastStudyDate) return false
    const lastStudy = new Date(user.LastStudyDate)
    const today = new Date()
    return (
      lastStudy.getDate() === today.getDate() &&
      lastStudy.getMonth() === today.getMonth() &&
      lastStudy.getFullYear() === today.getFullYear()
    )
  }

  const isStudied = hasStudiedToday()
  const [showAnimation, setShowAnimation] = useState(false)

  // Use sessionStorage to detect if we already animated in this session
  useEffect(() => {
    if (isStudied) {
      const animated = sessionStorage.getItem('streak_animated')
      if (animated !== 'true') {
        setShowAnimation(true)
        sessionStorage.setItem('streak_animated', 'true')

        // Auto hide the big animation after 3 seconds
        setTimeout(() => {
          setShowAnimation(false)
        }, 3000)
      }
    }
  }, [isStudied])

  return (
    <>
      {/* Topbar Icon */}
      <div className="flex items-center gap-1 font-bold">
        {isStudied ? (
          <motion.div
            initial={showAnimation ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="text-orange-500"
          >
            <Flame size={24} className="fill-orange-500" />
          </motion.div>
        ) : (
          <Flame size={24} className="text-gray-400" />
        )}
        <span className={isStudied ? 'text-orange-500' : 'text-gray-500'}>{user?.Streak || 0}</span>
      </div>

      {/* Fullscreen Overlay Animation */}
      {createPortal(
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.8, bounce: 0.5 }}
                className="flex flex-col items-center"
              >
                <Flame size={120} className="animate-pulse fill-orange-500 text-orange-500" />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-4xl font-black text-white drop-shadow-lg"
                >
                  Streak +1
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-lg text-orange-200"
                >
                  Hehehee +1 streak cho bạn iu nhé
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
