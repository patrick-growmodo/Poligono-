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
      image: '/images/gallery/Sneaker1.png',
      title: 'Sales Conversion Agent',
      badges: [
        { id: 'b1', label: 'SMS' },
        { id: 'b2', label: 'POS' },
        { id: 'b3', label: 'WhatsApp' }
      ],
      description: 'Intelligent conversion bot that guides your visitors from prospect to purchase.',
      category: 'convert'
    },
    {
        id: '22',
        image: '/images/gallery/Sneaker2.png',
        title: 'Shopping Assistant',
        badges: [
          { id: 'b4', label: 'Live Chat' },
          { id: 'b5', label: 'Product Rec' }
        ],
        description: 'Helps customers find the perfect products with personalized recommendations.',
        category: 'convert'
    },
    {
      id: '2',
      image: '/images/gallery/Sneaker2.png',
      title: 'Shopping Assistant',
      badges: [
        { id: 'b4', label: 'Live Chat' },
        { id: 'b5', label: 'Product Rec' }
      ],
      description: 'Helps customers find the perfect products with personalized recommendations.',
      category: 'convert'
    },
    {
        id: '166',
        image: '/images/gallery/Sneaker1.png',
        title: 'Sales Conversion Agent',
        badges: [
          { id: 'b1', label: 'SMS' },
          { id: 'b2', label: 'POS' },
          { id: 'b3', label: 'WhatsApp' }
        ],
        description: 'Intelligent conversion bot that guides your visitors from prospect to purchase.',
        category: 'convert'
      },
      {
          id: '221',
          image: '/images/gallery/Sneaker2.png',
          title: 'Shopping Assistant',
          badges: [
            { id: 'b4', label: 'Live Chat' },
            { id: 'b5', label: 'Product Rec' }
          ],
          description: 'Helps customers find the perfect products with personalized recommendations.',
          category: 'convert'
      },
      {
        id: '25',
        image: '/images/gallery/Sneaker2.png',
        title: 'Shopping Assistant',
        badges: [
          { id: 'b4', label: 'Live Chat' },
          { id: 'b5', label: 'Product Rec' }
        ],
        description: 'Helps customers find the perfect products with personalized recommendations.',
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
      id: '8',
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
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
              <h4 className="text-[20px] font-bold font-semibold text-black font-inter mb-3">
                {card.title}
              </h4>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {card.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className="relative px-3 py-2 text-black rounded-full text-[12px] font-normal font-inter flex items-center justify-center leading-[16px]"
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