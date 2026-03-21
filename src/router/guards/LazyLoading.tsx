import LazySpinner from '@/components/common/LazySpinner'
import { Suspense } from 'react'

export const SuspenseWrapper = ({
  children,
  name,
}: {
  children: React.ReactNode
  name: string
}) => {
  return <Suspense fallback={<LazySpinner name={name} />}>{children}</Suspense>
}
