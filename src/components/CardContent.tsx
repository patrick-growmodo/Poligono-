import React from 'react';
import Image from 'next/image';

interface Badge {
  id: string;
  label: string;
}

interface Card {
  id: string;
  image: string;
  title: string;
  badges: Badge[];
  description: string;
  category: string;
}

interface CardContentProps {
  activeFilter: string;
}

const CardContent: React.FC<CardContentProps> = ({ activeFilter }) => {
  const cardsData: Card[] = [
    {
      id: '1',
      image: '/images/gallery/img1.png',
      title: 'Sales Conversion Agent',
      badges: [
        { id: 'b1', label: 'SMS' },
        { id: 'b2', label: 'POS' },
        { id: 'b3', label: 'WhatsApp' }
      ],
      description: 'Helps customers complete their purchase via SMS, MMS, or WhatsApp right when they need it.',
      category: 'convert'
    },
    {
        id: '22',
        image: '/images/gallery/img2.png',
        title: 'Shopping Assistant',
        badges: [
          { id: 'b1', label: 'SMS' },
          { id: 'b2', label: 'POS' },
          { id: 'b3', label: 'WhatsApp' }
        ],
        description: 'Offers step-by-step guidance to help shoppers make confident buying decisions - right where they are.',
        category: 'convert'
    },
    {
      id: '2',
      image: '/images/gallery/img3.png',
      title: 'Lead qualification Agent',
      badges: [
          { id: 'b1', label: 'SMS' },
          { id: 'b2', label: 'RCS' },
          { id: 'b3', label: 'WhatsApp' },
          { id: 'b4', label: 'Voice' },
          { id: 'b5', label: 'Chat' }
      ],
      description: 'Gathers customer intent, assess qualification and seamlessly hands off high-value leads to a sales team.',
      category: 'convert'
    },
    {
        id: '166',
        image: '/images/gallery/img4.png',
        title: 'Upsell & Cross-Sell Agent',
        badges: [
          { id: 'b1', label: 'SMS' },
          { id: 'b2', label: 'RCS' },
          { id: 'b3', label: 'WhatsApp' }
        ],
        description: 'Identifies opportunities to offer higher-value or complementary products to customers.',
        category: 'convert'
      },
      {
          id: '221',
          image: '/images/gallery/img5.png',
          title: 'Loyalty & Rewards Agent',
          badges: [
            { id: 'b1', label: 'SMS' },
            { id: 'b2', label: 'RCS' },
            { id: 'b3', label: 'WhatsApp' }
          ],
          description: 'Promotes rewards via SMS, automates post-purchase invites, and reminds customers to redeem rewards.',
          category: 'convert'
      },
      {
        id: '25',
        image: '/images/gallery/img6.png',
        title: 'Retention Marketing Agent',
        badges: [
          { id: 'b1', label: 'SMS' },
          { id: 'b2', label: 'RCS' },
          { id: 'b3', label: 'WhatsApp' },
          { id: 'b4', label: 'Voice' },
          { id: 'b5', label: 'Chat' }
        ],
        description: 'Sends personalized reminders & special offers based on buying patterns to encourage buyers for repeat purchases.',
        category: 'convert'
    },
    {
      id: '225',
      image: '/images/gallery/img7.png',
      title: 'Customer Support Agent',
      badges: [
        { id: 'b1', label: 'SMS' },
        { id: 'b2', label: 'RCS' },
        { id: 'b3', label: 'WhatsApp' }

      ],
      description: 'Resolve customer inquiries quickly with AI-powered responses and seamless agent handoff.',
      category: 'convert'
  },
  {
    id: '8',
    image: '/images/gallery/img8.png',
    title: 'Order Tracking Agent',
    badges: [
      { id: 'b1', label: 'SMS' },
        { id: 'b2', label: 'RCS' },
        { id: 'b3', label: 'WhatsApp' }
    ],
    description: 'Enable real-time updates on order processing, shipping, and estimated delivery, reducing inbound queries',
    category: 'convert'
},
{
  id: '9',
  image: '/images/gallery/img9.png',
  title: 'Appointment Scheduling Agent',
  badges: [
    { id: 'b1', label: 'SMS' },
    { id: 'b2', label: 'RCS' },
    { id: 'b3', label: 'WhatsApp' },
    { id: 'b4', label: 'Voice' },
    { id: 'b5', label: 'Chat' }

  ],
  description: 'Offers 24/7 automated customer support, resolving common issues without human intervention.',
  category: 'convert'
},
    {
      id: '3',
      image: '/images/gallery/Sneaker3.png',
      title: 'Customer Support Agent',
      badges: [
        { id: 'b6', label: '24/7' },
        { id: 'b7', label: 'Multi-lang' }
      ],
      description: 'Provides instant customer support and resolves queries efficiently.',
      category: 'engage'
    },
    {
      id: '4',
      image: '/images/gallery/Sneaker1.png',
      title: 'Loyalty Manager',
      badges: [
        { id: 'b8', label: 'Rewards'},
        { id: 'b9', label: 'Points' }
      ],
      description: 'Manages customer loyalty programs and reward systems effectively.',
      category: 'engage'
    },
    {
        id: '14',
        image: '/images/gallery/Sneaker1.png',
        title: 'Loyalty Manager',
        badges: [
          { id: 'b8', label: 'Rewards' },
          { id: 'b9', label: 'Points' }
        ],
        description: 'Manages customer loyalty programs and reward systems effectively.',
        category: 'engage'
    },
    {
      id: '5',
      image: '/images/gallery/Sneaker2.png',
      title: 'Feedback Collector',
      badges: [
        { id: 'b10', label: 'Surveys'},
        { id: 'b11', label: 'Analytics' }
      ],
      description: 'Collects valuable customer feedback and insights for business improvement.',
      category: 'delight'
    },
    {
      id: '6',
      image: '/images/gallery/Sneaker3.png',
      title: 'Personalization Engine',
      badges: [
        { id: 'b12', label: 'AI-Powered' },
        { id: 'b13', label: 'Custom'}
      ],
      description: 'Creates personalized experiences for each customer based on their preferences.',
      category: 'delight'
    }
    ,
    {
      id: '7',
      image: '/images/gallery/Sneaker3.png',
      title: 'Personalization Engine',
      badges: [
        { id: 'b12', label: 'AI-Powered' },
        { id: 'b13', label: 'Custom' }
      ],
      description: 'Creates personalized experiences for each customer based on their preferences.',
      category: 'delight'
    }
    ,
    {
      id: '10',
      image: '/images/gallery/Sneaker3.png',
      title: 'Personalization Engine',
      badges: [
        { id: 'b12', label: 'AI-Powered' },
        { id: 'b13', label: 'Custom' }
      ],
      description: 'Creates personalized experiences for each customer based on their preferences.',
      category: 'delight'
    }
  ];

  const filteredCards = cardsData.filter(card => card.category === activeFilter);

  return (
    <div className="space-y-6">      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-[20px] border border-[#E4E4E4] overflow-hidden hover:shadow-lg transition-shadow duration-300 p-[24px]"
          >
            <div className="relative h-48 w-full rounded-[20px] mb-[32px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover rounded-[20px]"
              />
            </div>
            
            <div className="">
              <h4 className="text-[20px] font-bold font-semibold text-black font-inter mb-[16px]">
                {card.title}
              </h4>
              
              <div className="flex flex-wrap gap-2 mb-[16px]">
                {card.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className="relative px-[8px] py-1 text-black rounded-full text-[12px] font-normal font-inter flex items-center justify-center leading-[16px]"
                    style={{
                      background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #6940E4, #DA46F8) border-box',
                      border: '1px solid transparent'
                    }}
                  > 
                    {badge.label}
                  </span>
                ))}
              </div>
              
              <p className="text-[#11100D] text-[13px] font-inter font-normal  leading-[19.5px]"> 
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-inter">
            No solutions available for this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CardContent; 