import Image from "next/image";
import ProfileCard from "./ProfileCard";

const ImageCardContent: React.FC = () => {
    const profile_content = [
        {
            id: 1,
            title: 'User',
            title_color: 'text-white',
            description: 'My order hasn\'t arrived yet. Can you help me track it?',
            image: '/images/gallery/profile-1.png',
            background_color: 'bg-[#242424]',
            useGradientTitle: true,
            customGradient: 'linear-gradient(180deg, #DA46F8 0%, #7B51F8 100%)',
        },
        {
            id: 2,
            title: 'Poligono AI Agent',
            title_color: 'text-white',
            description: 'Your order is on its way and scheduled for delivery tomorrow!',
            image: '/images/icons/stars.png',
            background_color: 'bg-gradient-to-r from-[#6940E4] to-[#DA46F8]',
            useGradientTitle: false,
            customGradient: 'linear-gradient(90deg, #6940E4 -8.03%, #DA46F8 105.34%)',
        },
     ]
  return (
    <div className="max-w-[1312px] mx-auto"> 
      {/* Main Title */}
      <div className="mb-[80px]">
        <h2 className="text-[48px] font-normal text-white font-inter leading-[57.6px] max-w-[693px]">
          Full Stack of AI Agent Superpowers in One Platform
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0px] border-t-[1px] border-[#484848]">
        {/* Left Column */}
        <div className="space-y-[32px] p-[64px] pb-[0px] border-r-[1px] border-[#484848]">
          <div className="max-w-[516px]">
            <h3 className="text-[22px] font-normal text-white font-inter mb-[24px] leading-[30.8px]">
              On-Brand, Every Time
            </h3>
            <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px] max-w-[516px]">
              AI agents adapt to your brand's tone, language, and personality. No generic scripts, just conversations that feel like you.
            </p>
          </div>

          {/* Phone Mockup */}
          <div className="relative">
            <div className="relative w-[516px] mx-auto">
              <Image
                src="/images/gallery/phone.png"
                alt="Phone mockup showing AI conversation"
                width={516}
                height={643.066}
                className="object-contain"
              />
              
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-[32px] p-[64px] flex flex-col justify-between">
          <div className="max-w-[516px]">
            <h3 className="text-[22px] font-normal text-white font-inter mb-[24px] leading-[30.8px]">
              Knows Every Customer, Instantly
            </h3>
            <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px] max-w-[516px]">
              Your agents get full context with 360° customer profiles - past orders, preferences, behavior - for intelligent conversation from the first message.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[24px]">
          {profile_content.map((item) => (
              <ProfileCard 
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                background_color={item.background_color}
                title_color={item.title_color}
                useGradientTitle={item.useGradientTitle}
                customGradient={item.customGradient}
              />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCardContent;