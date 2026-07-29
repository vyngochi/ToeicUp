'use client'
import { Button } from '@/components/ui/button'
import type { Vocab, VocabDef } from '@/types/response/list-vocab.types'
import type { ColumnDef } from '@tanstack/react-table'
import { AudioLines } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Vocab<VocabDef>>[] = [
  {
    accessorKey: 'No',
    header: 'No.',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'Term',
    header: 'Từ vựng',
  },
  {
    accessorKey: 'WordForm',
    header: 'Từ loại',
  },
  {
    accessorKey: 'Phonetic',
    header: 'Phát âm',
  },
  {
    accessorKey: 'word_definitions',
    header: 'Định nghĩa',
    cell: ({ row }) => {
      const def = row.getValue('word_definitions') as VocabDef[]

      return (
        <div className="max-w-75 min-w-50 py-2 wrap-break-word whitespace-normal">
          {def.map((item) => (
            <span key={item.Id}>{item.DefinitionVi}</span>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'AudioUrl',
    header: 'Nghe',
    cell: ({ row }) => {
      const url = row.getValue('AudioUrl') as string

      const handlePlay = () => {
        if (url) {
          const audio = new Audio(url)
          audio.play().catch((err) => console.error('Lỗi phát âm thanh:', err))
        } else {
          const utterance = new SpeechSynthesisUtterance(row.getValue('Term'))
          utterance.lang = 'en-US'
          window.speechSynthesis.speak(utterance)
        }
      }

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlay}
          disabled={!url && !row.getValue('Term')}
          className="h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-600"
        >
          <AudioLines className="h-5 w-5" />
        </Button>
      )
    },
  },
]
