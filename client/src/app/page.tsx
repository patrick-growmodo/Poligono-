import { 
  ImageContent, 
  AIRecommendation, 
  Marquee, 
  CustomerJourney, 
  FilterCardSection, 
  PlatformFeatures, 
  AgentWorkflowSection,
  PricingContent,
  TransparentPricingSection,
  ChannelPricingSection,
  ContactSection,
  Footer
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
      <TransparentPricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}  