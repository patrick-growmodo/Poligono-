import Image from "next/image";

export default function CardPlan({ plan }: { plan: any }) {
    return (
        <div className={`relative bg-white dark:bg-[#1A1A1A] rounded-[12px] border-2 p-[16px_28px_28px_28px] flex flex-col justify-between ${
            plan.popular 
                ? 'border-[#6B46C1] shadow-lg' 
                : 'border-gray-200 dark:border-gray-600'
        }`}>

            <div>
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center">
                    <Image src={plan.icon} alt={plan.name} width={50} height={50} />
                </div>
                <h3 className="text-[20px] font-medium text-gray-900 dark:text-white mb-2">
                    {plan.name}
                </h3>
                <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                </p>
                <div className="text-[32px] font-bold text-gray-900 dark:text-white">
                    {plan.price}
                </div>
            </div>

            {/* Features */}
            <div className="mb-6">
                <h4 className="text-[14px] font-medium text-gray-900 dark:text-white mb-3">
                    Features included:
                </h4>
                <ul className="space-y-2">
                    {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-[14px] text-gray-700 dark:text-gray-300">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Limitations (only for Free plan) */}
            {plan.limitations && (
                <div className="mb-6">
                    <h4 className="text-[14px] font-medium text-gray-900 dark:text-white mb-3">
                        Limitations:
                    </h4>
                    <ul className="space-y-2">
                        {plan.limitations.map((limitation: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                                    <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-[14px] text-gray-500 dark:text-gray-400">
                                    {limitation}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>

            {/* Button */}
            <button
                className={`w-full py-3 px-4 rounded-[8px] text-[14px] font-medium transition-colors`}
                style={{
                    background: ' linear-gradient(90deg, #6940E4 0.07%, #FF5AFE 124.81%), #E8E8E8'
                }}
            >
                {plan.buttonText}
            </button>
        </div>
    )
}