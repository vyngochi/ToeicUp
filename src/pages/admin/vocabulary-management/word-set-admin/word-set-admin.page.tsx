import { Button } from '@/components/ui/button'
import WordSetTableDataAdmin from '@/features/admin/material-management/wordset-management/components/WordSetTableData.admin'
import { useNavigate } from 'react-router-dom'

export default function WordSetAdminPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-accent-foreground h-full rounded-2xl border-(--color-border) p-10">
      <Button className="mb-5" variant={'destructive'} onClick={() => navigate(-1)}>
        Trở lại
      </Button>
      <div className="flex flex-col justify-between gap-1 md:flex-row">
        <h4 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
          Quản lý bộ từ vựng
        </h4>
        {/* <div className="flex gap-1">
          <Button className="bg-orange-400"></Button>
          <Button className="bg-orange-400"></Button>
        </div> */}
      </div>

      <WordSetTableDataAdmin />
    </div>
  )
}
