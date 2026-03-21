import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import type { FeatureCardTypes } from './FeatureCard'
import FeatureCard from './FeatureCard'

export function FeatureCardCarousel({ features }: { features: FeatureCardTypes[] }) {
  return (
    <Carousel className="w-full max-w-60 sm:max-w-xs" plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent>
        {features.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <FeatureCard icon={item.icon} title={item.title} content={item.content} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
