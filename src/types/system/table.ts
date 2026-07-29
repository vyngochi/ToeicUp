import type { RowData } from '@tanstack/react-table'

export interface MyTableMeta<TData> {
  onOpenDeleteModal?: (data: TData) => void
  onOpenEditModal?: (data: TData) => void
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> extends MyTableMeta<TData> {}
}
