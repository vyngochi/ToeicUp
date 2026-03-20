import { Star, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLandingStore } from '@/stores/landingStore'
import DemoImage from '@/assets/images/demo-image.png'

export default function HeroSection() {
  const { heroContent: c } = useLandingStore()

  return (
    <section className="relative overflow-hidden pt-[100px]">
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-(--color-blue-100) opacity-20 mix-blend-multiply blur-3xl filter" />

      <div className="mx-5 md:mx-20 md:mt-5 lg:mx-40">
        <div className="mb-6 flex justify-center md:mb-8">
          <span className="from---color-blue-50) inline-flex items-center gap-1.5 rounded-full border border-(--color-blue-200) bg-linear-to-r to-(--color-blue-100) px-4 py-2 text-xs font-semibold text-(--color-blue-600) shadow-sm">
            <div className="h-2 w-2 rounded-full bg-(--color-blue-600)" />
            {c.badge}
          </span>
        </div>

        <h1 className="text-center text-3xl leading-tight font-bold tracking-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
          <span className="text-(--color-gray-900)">{c.heading}</span>{' '}
          <div>
            <span className="bg-(--color-blue-400) bg-clip-text text-transparent">
              {c.headingHighlight1}
            </span>
            <span className="text-(--color-gray-900)"> và </span>
            <span className="bg-linear-to-r from-(--color-red-600) to-(--color-amber-600) bg-clip-text text-transparent">
              {c.headingHighlight2}
            </span>
          </div>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-(--color-gray-600) md:mt-8 md:text-lg">
          {c.subtext}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10 md:gap-5">
          <Button size="lg" variant={'outline'}>
            {c.ctaPrimary}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            <Play className="mr-2 h-5 w-5 fill-current" />
            {c.ctaSecondary}
          </Button>
        </div>

        <div className="mt-16 md:mt-20 lg:mt-24">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 lg:gap-10">
            {c.stats.map((item, _) => (
              <div key={item.label} className="group relative">
                <div className="absolute inset-0 rounded-2xl border border-(--color-gray-200) bg-linear-to-br from-white to-[var(--color-gray-50)] transition-all duration-300 group-hover:border-(--color-blue-200) group-hover:shadow-lg" />

                <div className="relative flex flex-col items-start p-5 md:p-6 lg:p-8">
                  {item.isBorder && (
                    <div className="absolute top-1/4 right-0 bottom-1/4 hidden w-px bg-linear-to-b from-transparent via-(--color-gray-200) to-transparent md:block" />
                  )}

                  <div className="flex items-center gap-2">
                    <span className="bg-linear-to-r from-(--color-gray-900) to-(--color-gray-700) bg-clip-text text-2xl font-bold text-transparent md:text-3xl lg:text-4xl">
                      {item.data}
                    </span>
                    {item.label === 'Đánh giá' && (
                      <Star
                        size={20}
                        className="fill-(--color-amber-400) text-(--color-amber-400)"
                      />
                    )}
                  </div>
                  <p className="mt-2 text-xs font-medium text-(--color-gray-600) md:text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 lg:mt-28">
          <div className="group relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-r from-(--color-blue-600)/20 to-(--color-blue-800)/20 blur-2xl transition-all duration-300 group-hover:blur-3xl" />
            <img
              className="group-hover:shadow-3xl w-full rounded-3xl border border-(--color-gray-100) shadow-2xl transition-shadow duration-300"
              src={DemoImage}
              alt="Demo VocabToeic dashboard"
            />
          </div>
        </div>

        <div className="h-12 md:h-16" />
      </div>
    </section>
  )
}
