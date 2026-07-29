import { useGetListVocabByWordSetId } from '@/hooks/learning/useGetListVocabByWordSetId'
import { VocabTableAdmin } from './VocabTable.admin'
import { useParams } from 'react-router-dom'
import { columns } from '../configs/vocab.columns'

export default function VocabTableDataAdmin() {
  const { wordSetId } = useParams()
  const { data: vocabs, isFetching } = useGetListVocabByWordSetId({
    wordSetId: wordSetId as string,
  })
  return (
    <div>
      <VocabTableAdmin isFetching={isFetching} data={vocabs!} columns={columns} />
    </div>
  )
}
