import React from 'react'

const CustomerJourney: React.FC = () => {

    const customerJourney = [
        {
            title: "AI Agents That Power Every Step of the Customer Journey",
            description: "From acquisition to retention, deploy specialised agents that convert visitors, engage customers, and deliver instant support"
        }
    ]

  return (
    <section className="bg-white pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end  ">
          {/* Left Content */}
          <div>
            <h2 className="w-[613px] text-4xl lg:text-5xl font-medium text-black font-inter leading-[57.6px ]">
              {customerJourney[0].title}
            </h2>
          </div>
          
          {/* Right Content */}
          <div>
            <p className="text-lg font-inter text-[#2F2F2F] leading-[27px]">
              {customerJourney[0].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerJourney 