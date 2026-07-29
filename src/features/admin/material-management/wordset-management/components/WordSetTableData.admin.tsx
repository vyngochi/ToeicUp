import { useGetAllWordSets } from '@/hooks/admin/material-management/useGetAllWordSets'
import { columns } from '../configs/word-set.columns'
import { WordSetTableAdmin } from './WordSetTable'
import { AlertModal } from '@/components/common/AlertDialog'
import { useDeleteWordSetItem } from '@/hooks/admin/tables/useDeleteWordSetItem'

export default function WordSetTableDataAdmin() {
  const { data, isFetching } = useGetAllWordSets({ pageSize: 100 })

  const action = useDeleteWordSetItem()

  return (
    <div>
      <WordSetTableAdmin
        meta={{ onOpenDeleteModal: action.handleOpenDelete }}
        isFetching={isFetching}
        data={data?.data?.wordSets!}
        columns={columns}
      />
      <AlertModal
        open={!!action.selectedWordSet}
        onOpenChange={(open) => !open && action.setSelectedWordSet(null)}
        title={`Bạn muốn xóa word set '${action.selectedWordSet?.name}'?`}
        description="Word Set sẽ bị chuyển sang trạng thái ngưng hoạt động!"
        action={{
          buttonName: action.isPending ? 'Đang xóa...' : 'Xác nhận',
          handleAction: action.onConfirmDelete,
        }}
      />
    </div>
  )
}
