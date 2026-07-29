import { PaginationTable } from '@/components/common/Pagination'
import { columns } from '../config/word-table.column'
import { WordTables } from './WordTable'
import { useGetListVocabByWordSetId } from '@/hooks/learning/useGetListVocabByWordSetId'
import { useParams } from 'react-router-dom'
import { SelectPageSize } from '@/components/common/PageSizeSelect'
import { useState } from 'react'

export default function WordTableData() {
  const [pageSize, setPageSize] = useState('10')
  const [pageIndex, setPageIndex] = useState(1)
  const { wordSetId } = useParams()

  const { data, isFetching } = useGetListVocabByWordSetId({
    wordSetId: wordSetId as string,
    pageSize: Number(pageSize),
    pageIndex,
  })

  return (
    <div className="flex h-full flex-col min-h-0">
      <WordTables isFetching={isFetching} data={data?.vocabs || []} columns={columns} />
      <div className="mt-auto flex w-full flex-col items-center justify-between gap-4 p-4 sm:flex-row shrink-0">
        <SelectPageSize
          placeholder="Số từ"
          title="Số từ vựng / Trang"
          values={[10, 20, 30, 40]}
          onSelect={(val) => {
            setPageSize(val)
            setPageIndex(1) // Reset to page 1 when page size changes
          }}
        />
        <PaginationTable
          currentPage={data?.page || 1}
          totalPages={data?.totalPages || 1}
          onPageChange={setPageIndex}
        />
      </div>
    </div>
  )
}
