import HeroSection from '@/components/landing/HeroSection'
import LandingHeader from '@/components/landing/LandingHeader'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <div id="works" style={{ height: '100vh' }}></div>
    </>
  )
}
