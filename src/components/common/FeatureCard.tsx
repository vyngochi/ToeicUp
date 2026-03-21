export interface FeatureCardTypes {
  icon: React.ReactNode
  title: string
  content: string
}
export default function FeatureCard({ icon, title, content }: FeatureCardTypes) {
  return (
    <div className="w-full rounded-2xl border">
      <div className="flex w-full flex-col items-start gap-2 p-5 text-start">
        <div className="rounded-xl border p-2">{icon}</div>
        <div className="text-xl font-semibold">{title}</div>
        <div>{content}</div>
      </div>
    </div>
  )
}
