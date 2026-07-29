import { deleteWordSet } from '@/services/admin/vocabulary.service'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteWordSet = (wordSetId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-word-set', wordSetId],
    mutationFn: async () => {
      const response = await deleteWordSet(wordSetId)
      return response.data.message
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['admin-word-sets'] })
      toast.success(data)
    },
    onError: (error) => {
      handleServerError(error)
    },
  })
}
