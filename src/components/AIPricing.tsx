import PricingList from "./PricingList";

const AIPricing: React.FC = () => {
    const agentPricingItems = [
        {
          id: '1',
          title: 'Voice AI agent',
          price_description: '$0.050/min+ Voice call charges',
        },
        {
          id: '2',
          title: 'SMS AI agent',
          price_description: '$0.090/conversation+ SMS / MMS charges',
        },
        {
          id: '3',
          title: 'WhatsApp AI agent',
          price_description: '$0.090/conversation+ WhatsApp charges',
        },
        {
          id: '4',
          title: 'Chat AI agent',
          price_description: '$0.090/conversation',
        }
      ];
    
      const agentSkillsItems = [
        {
          id: '1',
          title: 'AI Image generation',
          price_description: '$0.04/image',
        },
        {
          id: '2',
          title: 'AI Video generation',
          price_description: '$0.20/min',
        },
        {
          id: '3',
          title: 'AI Audio generation',
          price_description: '$0.02/min',
        }
      ];
    return (
        <div className="max-w-[1312px] mx-auto">

 <div className="flex flex-col lg:flex-row justify-between items-start gap-[32px] mb-[80px]">
       {/* Left - Title */}
       <div className="flex-1">
         <h2 className="text-[48px] font-medium text-black font-inter leading-[57.6px] max-w-[613px]">
           Transparent Pricing Built for Scale
         </h2>
       </div>
       
       {/* Right - Description */}
       <div className="flex-1 max-w-[400px]">
         <p className="text-[16px] text-[#2F2F2F] font-inter leading-[24px]">
         Only pay for what you use with flexible, usage-based pricing for AI agents and communication channels. Scale confidently with pricing adapts to your needs, and volume discounts.
         </p>
       </div>
     </div>

     {/* AI Agents Section */}
     <div className="gap-[0px]">
       <h3 className="text-[28px] font-semibold text-[#110F0F] font-inter mb-[24px]">
         AI Agents
       </h3>
       
       {/* Two Column Layout */}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-[0px]">
         
         {/* Left Column - 60% (3/5) */}
         <div className="xl:col-span-3 lg:col-span-5 md:col-span-1">
           <div className="bg-white rounded-[8px] border border-[#E4E4E4] p-[48px] flex flex-col  gap-[64px]">
             <h4 className="text-[20px] font-semibold text-[#11100D] font-inter">
               AI Agent Pricing
             </h4>
             <PricingList align='left' items={agentPricingItems} />
           </div>
         </div>

         {/* Right Column - 40% (2/5) */}
         <div className="xl:col-span-2 lg:col-span-5 h-full">
           <div className="bg-white rounded-[8px] border border-[#E4E4E4] p-[48px] h-full flex flex-col  gap-[64px]">
             <h4 className="text-[20px] font-semibold text-[#11100D] font-inter">
               AI Agent Skills
             </h4>
             <PricingList align='right' items={agentSkillsItems} />
           </div>
         </div>
       </div>
     </div>
        </div>
      
    )
}

export default AIPricing;
     