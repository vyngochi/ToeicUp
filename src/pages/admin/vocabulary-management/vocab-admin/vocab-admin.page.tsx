import { Button } from '@/components/ui/button'
import VocabTableDataAdmin from '@/features/admin/material-management/vocabulary/components/VocabTableData.admin'
import { useLocation, useNavigate } from 'react-router-dom'

export default function VocabAdminPage() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className="bg-accent-foreground h-full rounded-2xl border-(--color-border) p-10">
      <Button className="mb-5" variant={'destructive'} onClick={() => navigate(-1)}>
        Trở lại
      </Button>
      <div className="flex flex-col justify-between gap-1 md:flex-row">
        <h4 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
          Quản lí từ vựng: <span className="text-shadow-2xs">{location.state?.pageName}</span>
        </h4>
      </div>

      <VocabTableDataAdmin />
    </div>
  )
}
