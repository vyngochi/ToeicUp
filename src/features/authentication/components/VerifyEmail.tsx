import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useVerifyEmailRegister } from '@/hooks/auth/useRegister'
import { IS_VERIFIED, STEP_KEY, STORAGE_KEY } from '@/lib/env'
import { getStorage, removeStorage } from '@/utils/sessionHelper'
import { useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const { mutate: verify, isPending } = useVerifyEmailRegister()

  const handleCreateNewAcc = () => {
    removeStorage([STEP_KEY, STORAGE_KEY])
    navigate('/register')
  }

  const token = new URLSearchParams(location.search).get('token') ?? ''

  const handleVerifyEmail = () => {
    verify({ token: token })
  }

  const isRegister = getStorage(IS_VERIFIED) === 'true'

  return (
    <Card className="w-[90%] sm:max-w-md">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-center text-xl font-semibold tracking-tight first:mt-0 md:text-3xl">
          Xác thực tài khoản
        </h2>
      </CardHeader>

      <CardContent>
        {isRegister ? (
          <h4 className="scroll-m-20 text-center text-sm font-semibold tracking-tight md:text-xl">
            Vui lòng mở ứng dụng Mail để xác thực tài khoản
          </h4>
        ) : token ? (
          <h4 className="scroll-m-20 text-center text-sm font-semibold tracking-tight md:text-xl">
            Chào mừng bạn đến với TOEIC Up! 🎉 <br /> Nhấn xác thực để truy cập tài khoản
          </h4>
        ) : (
          <h4 className="scroll-m-20 text-center text-sm font-semibold tracking-tight md:text-xl">
            Vui lòng điền form đăng ký tài khoản
          </h4>
        )}
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between">
        {isRegister || token ? (
          <>
            <Button variant={'outline'} onClick={handleCreateNewAcc}>
              Tạo tài khoản khác
            </Button>
            {token ? (
              <Button variant={'secondary'} onClick={handleVerifyEmail}>
                {isPending && <Spinner />}
                Xác thực
              </Button>
            ) : (
              <Button onClick={() => window.open('https://mail.google.com', '_blank')}>
                Gmail
              </Button>
            )}
          </>
        ) : (
          <Button variant={'outline'} onClick={() => navigate('/register')}>
            Trở lại đăng ký
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
