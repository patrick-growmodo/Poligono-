interface PricingItem {
    id: string;
    title: string;
    price_description: string;
  }


const PricingList: React.FC<{ items: PricingItem[], align: 'left' | 'right' }> = ({ items, align }) => {
  console.log(align);
  return (
    <div className="space-y-[16px]">
      {items.map((item) => (
        <div key={item.id}>
          {/* Purple check icon */}

          
          {/* Content */}
          <div className="flex flex-col gap-[12px] justify-between md:flex-row lg:flex-row">
            <div className="flex flex-row gap-[12px] items-center">
            <div className="w-[24px] h-[24px] border-2 border-[#6940E4] rounded-full flex items-center justify-center">
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M10.5 1.5L4.5 7.5L1.5 4.5" stroke="#6940E4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className="text-[18px] font-normal text-black font-inter whitespace-nowrap">
                {item.title}
            </span>

            </div>
            <div className={`${align === 'left' ? 'w-[100%] md:w-[370px] lg:w-[370px]' : 'w-[166px] md:w-[166px] lg:w-[166px]'} flex flex-row gap-[4px]`}>
                <span className="text-[18px] font-normal text-[#747474] font-inter">
                  {item.price_description} 
                </span>               
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;