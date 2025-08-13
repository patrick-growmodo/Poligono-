import CardPlan from "./CardPlan";

const plans = [
    {
        id: 1,
        name: "Free Plan",
        icon: "/images/icons/plan-rocket.png",
        description: "Perfect for getting started with AI agents",
        price: "$0/mo",
        features: [
            "Up to 1 AI agent",
            "500 conversations per month",
            "Basic integrations",
            "Email support",
            "1 GB knowledge base storage"
        ],
        limitations: [
            "No advanced analytics",
            "Limited customization options"
        ],
        buttonText: "Get started free",
        buttonStyle: "primary"
    },
    {
        id: 2,
        name: "Starter Plan",
        icon: "/images/icons/plan-thunder.png",
        description: "Ideal for individuals and small teams",
        price: "$29/mo",
        popular: true,
        features: [
            "Up to 5 AI agents",
            "2,000 conversations/month",
            "All integrations included",
            "Email support",
            "10 GB knowledge base storage",
            "Basic analytics dashboard",
            "Custom agent branding"
        ],
        buttonText: "Get started for $29/mo",
        buttonStyle: "primary"
    },
    {
        id: 3,
        name: "Pro Plan",
        icon: "/images/icons/plan-heart.png",
        description: "Advanced features for growing businesses",
        price: "$99/mo",
        features: [
            "Up to 25 AI agents",
            "10,000 conversations/month",
            "All integrations included",
            "Priority support",
            "100 GB knowledge base storage",
            "Advanced analytics & insights",
            "A/B testing capabilities",
            "Multi-language support",
            "Custom workflows"
        ],
        buttonText: "Get started for $99/mo",
        buttonStyle: "primary"
    },
    {
        id: 4,
        name: "Enterprise Plan",
        icon: "/images/icons/plan-users.png",
        description: "Custom solutions for large organizations",
        price: "Custom",
        features: [
            "Unlimited AI agents",
            "Unlimited conversations",
            "Custom integrations",
            "Dedicated account manager",
            "Unlimited knowledge base",
            "Custom analytics & reports",
            "Advanced security",
            "On-premise deployment",
            "24/7 priority support"
        ],
        buttonText: "Get a custom offer",
        buttonStyle: "secondary"
    }
]

export default function SubscriptionPlans() {   

    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-[20px]">
            <div>
                <h1 className="text-[20px] font-normal text-gray-900 dark:text-white">Choose Your Plan</h1>
                <p className="text-[16px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">
                Choose the plan that best suits your needs and start using our platform today.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[24px]">
                {plans.map((plan) => ( 
                    <CardPlan key={plan.id} plan={plan} />
                ))}
            </div>


        </div>
    )
}