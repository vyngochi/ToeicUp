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

export function DropdownMenuAvatar() {
  const user = useAuthStore((s) => s.user)
  const { mutate: logoutServer, isPending } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.avatarUrl ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>TUP</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutServer()}>
          {isPending ? <Spinner /> : <LogOutIcon />}
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
