import TableRowCenter from '@/components/common/TableRowCenter'
import { Button } from '@/components/ui/button'
import type { AdminTopic, AdminWordSet } from '@/types/response/list-wordset.types'
import { formatDate } from '@/utils/formatDate'
import { removeWhiteSpace } from '@/utils/stringHandler'
import type { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AdminWordSet<AdminTopic>>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'No',
    header: 'No.',
    cell: (info) => info.row.index + 1,
  },

  {
    accessorKey: 'name',
    header: 'Bộ từ vựng',
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    cell: ({ row }) => {
      return <TableRowCenter>{row.getValue('level')}</TableRowCenter>
    },
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => {
      return (
        <div className="max-w-50 min-w-25 wrap-break-word whitespace-normal">
          {row.getValue('description')}
        </div>
      )
    },
  },
  {
    accessorKey: 'total_words',
    header: 'Tổng số từ vựng',
    cell: ({ row }) => {
      return <TableRowCenter>{row.getValue('total_words')}</TableRowCenter>
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      return formatDate(row.getValue('created_at'), 'HH:mm DD/MM/YYYY')
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Ngày cập nhật',
    cell: ({ row }) => {
      return formatDate(row.getValue('updated_at'), 'HH:mm DD/MM/YYYY')
    },
  },
  {
    header: 'Danh sách từ vựng',
    cell: ({ row }) => {
      const navigate = useNavigate()
      return (
        <TableRowCenter>
          <Button
            size={'sm'}
            variant={'link'}
            onClick={() =>
              navigate(
                `/admin/vocab/${removeWhiteSpace(row.getValue('name'))}/${row.getValue('id')}`,
              )
            }
          >
            Truy cập
          </Button>
        </TableRowCenter>
      )
    },
  },
  {
    header: 'Hành động',
    cell: ({ row, table }) => {
      const { onOpenDeleteModal } = table.options.meta as any

      return (
        <div className="flex justify-center gap-0.5">
          <Button size={'xs'} variant={'outline'}>
            Cập nhật
          </Button>
          <Button
            size={'xs'}
            variant={'destructive'}
            onClick={() => onOpenDeleteModal(row.original)}
          >
            Xóa
          </Button>
        </div>
      )
    },
  },
]
