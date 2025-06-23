import React from 'react'
import Image from 'next/image'

const Marquee: React.FC = () => {
  const marqueeText = "Every Challenge Meets Innovation"
  
    const marqueeItems = [
    {
        text: "Every Challenge Meets Innovation",
        icon: "/images/icons/marquee-icon.svg"
    },
    {
        text: "Every Challenge Meets Innovation",
        icon: "/images/icons/marquee-icon.svg"
    },
    {
        text: "Every Challenge Meets Innovation",
        icon: "/images/icons/marquee-icon.svg"
    },
  ]

  const renderMarqueeText = (text: string) => (
    <span className="text-2xl md:text-[41.762px] font-medium leading-[1.2]">
      <span 
        className="text-transparent bg-clip-text"
        style={{
          background: 'linear-gradient(90deg, #623FE3 0%, #DA46F8 49.02%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Every Challenge
      </span>
      <span className="text-black"> Meets Innovation</span>
    </span>
  )



  return (
    <div className="bg-white py-[48px] overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee gap-[30px] items-center">
          {/* First set of items */} 
          <div className="flex items-center gap-[30px] whitespace-nowrap">
            {marqueeItems.map((item, index) => (
              <React.Fragment key={`first-${index}`}>
                {renderMarqueeText(item.text)}
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt="Marquee icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-8 whitespace-nowrap min-w-full">
            {marqueeItems.map((item, index) => (
              <React.Fragment key={`second-${index}`}>
                {renderMarqueeText(item.text)}
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt="Marquee icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marquee 