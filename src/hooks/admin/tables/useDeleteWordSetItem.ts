import type { AdminTopic, AdminWordSet } from '@/types/response/list-wordset.types'
import { useState } from 'react'
import { toast } from 'sonner'
import { useDeleteWordSet } from '../material-management/useDeleteWordSet'

export const useDeleteWordSetItem = () => {
  const [selectedWordSet, setSelectedWordSet] = useState<AdminWordSet<AdminTopic> | null>(null)
  const { mutate: deleteWordSet, isPending } = useDeleteWordSet(selectedWordSet?.id!)

  const handleOpenDelete = (wordSet: AdminWordSet<AdminTopic>) => {
    if (wordSet.total_words > 0) {
      return toast.error('Không thể xóa bộ từ vựng có chứa từ vựng')
    }
    setSelectedWordSet(wordSet)
  }

  const onConfirmDelete = () => {
    if (selectedWordSet) {
      deleteWordSet(undefined, {
        onSuccess: () => setSelectedWordSet(null),
      })
    }
  }

  const action = {
    selectedWordSet,
    setSelectedWordSet,
    handleOpenDelete,
    onConfirmDelete,
    isPending,
  }

  return action
}
