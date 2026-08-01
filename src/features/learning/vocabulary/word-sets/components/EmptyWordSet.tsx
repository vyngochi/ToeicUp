import { Inbox } from 'lucide-react'

export default function EmptyWordSet({ message = "Không tìm thấy bộ từ vựng nào phù hợp." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50  shadow-inner">
        <Inbox className="h-10 w-10 text-blue-300 " />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-slate-800 ">Rất tiếc!</h3>
      <p className="text-slate-500 max-w-md">{message}</p>
    </div>
  )
}
