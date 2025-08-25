'use client';

import React from 'react';
import FeatureGrid from './FeatureGrid';
import IntegrationsSection from './IntegrationsSection';
import AgentActionsSection from './AgentActionsSection';
import ImageCardContent from './ImageCardContent';




const PlatformFeatures: React.FC = () => {

 const featuresData = [
  {
    id: 1,
    title: 'Trained with your knowledge sources',
    description: 'Respond with accurate, on-brand answers by tapping into your FAQs and product info.',
    image: '/images/gallery/featured1.png',
    imageWidth: 300,
    imageHeight: 250
  }, 
  {
    id: 2,
    title: 'Built for Timely Engagement',
    description: 'Launches campaigns, triggers interactions based on customer activity, schedules, or live conversation cues.',
    image: '/images/gallery/featured2.png',
    imageWidth: 300,
    imageHeight: 250
  },
  {
    id: 3,
    title: 'Works across every channel',
    description: 'Engage customers across SMS, WhatsApp, voice, web, and more — with one unified agent',
    image: '/images/gallery/featured3.png',
    imageWidth: 300,
    imageHeight: 250
  }
];
const featuresData2 = [
  {
    id: 1,
    title: 'Powered by the Best AI Models',
    description: 'Supports all leading LLMs — including OpenAI, Google, Anthropic, and Meta — to choose a model that works best for your business',
    image: '/images/gallery/featured4.png',
    imageWidth: 300,
    imageHeight: 250
  }, 
  {
    id: 2,
    title: 'Multi-Modal Understanding',
    description: 'Handles conversations across formats — with the ability to understand and respond through texts, audio, video and images.',
    image: '/images/gallery/featured5.png',
    imageWidth: 300,
    imageHeight: 250
  },
  {
    id: 3,
    title: 'Speaks Your Customer’s Language',
    description: 'Engages customers in their native language with natural, seamless conversations, supporting multiple languages.',
    image: '/images/gallery/featured6.png',
    imageWidth: 300,
    imageHeight: 250
  }
];
  return (
    <section id='features-section' className="bg-dark py-[100px]  px-4 sm:px-6 lg:px-8">
      <ImageCardContent/>
      <FeatureGrid featuresData={featuresData} />
      <IntegrationsSection />
      <AgentActionsSection />
      <FeatureGrid featuresData={featuresData2} />
    </section>
    
  );
};

export default PlatformFeatures; 