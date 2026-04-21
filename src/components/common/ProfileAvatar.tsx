import { BadgeCheckIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/global/authStore'
import { useLogout } from '@/hooks/auth/useLogout'
import { Spinner } from '../ui/spinner'
import { useNavigate } from 'react-router-dom'

export function DropdownMenuAvatar() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const { mutate: logoutServer, isPending } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isPending ? 'outline' : 'ghost'} size="icon" className="rounded-full">
          {isPending ? (
            <Spinner />
          ) : (
            <Avatar>
              <AvatarImage src={user?.AvatarUrl ?? 'https://github.com/shadcn.png'} />
              <AvatarFallback>TUP</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile/information')}>
            <BadgeCheckIcon />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutServer()}
          onSelect={(e) => {
            if (isPending) {
              e.preventDefault()
            }
          }}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : <LogOutIcon />}
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
