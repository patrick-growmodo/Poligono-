import { 
  ImageContent, 
  AIRecommendation, 
  Marquee, 
  CustomerJourney, 
  FilterCardSection, 
  PlatformFeatures, 
  AgentWorkflowSection,
  PricingContent
} from '@/components'

export default function Home() {
  return (
    <main>
      <ImageContent />
      <AIRecommendation />
      <Marquee />
      <CustomerJourney />
      <FilterCardSection />
      <PlatformFeatures />
      <AgentWorkflowSection />
      <PricingContent />
    </main>
  )
}  