import FeatureSection from '@/components/landing/FeatureSection'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorks'
import LandingFooter from '@/components/landing/LandingFooter'
import LandingHeader from '@/components/landing/LandingHeader'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <LandingFooter />
    </>
  )
}
