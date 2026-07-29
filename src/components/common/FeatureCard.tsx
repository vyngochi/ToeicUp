export interface FeatureCardTypes {
  icon: React.ReactNode
  title: string
  content: string
}
export default function FeatureCard({ icon, title, content }: FeatureCardTypes) {
  return (
    <div className="w-full rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-300">
      <div className="flex w-full flex-col items-start gap-3 p-6 text-start">
        <div className="rounded-xl border bg-white/50 shadow-sm p-3">{icon}</div>
        <div className="text-xl font-semibold text-gray-900">{title}</div>
        <div className="text-gray-600 leading-relaxed">{content}</div>
      </div>
    </div>
  )
}
