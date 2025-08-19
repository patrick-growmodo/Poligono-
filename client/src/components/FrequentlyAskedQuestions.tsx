import FAQCard from "./FAQCard";

const faqs = [
    {
        id: 1,
        question: "Can I change plans anytime?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades."
    },
    {
        id: 2,
        question: "Is there a free trial?",
        answer: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial. You can test the platform before buying any plans and see if it fits your needs."
    },
    {
        id: 3,
        question: "What happens to my data if I downgrade?",
        answer: "Your data is safely stored and you'll retain access to it. However, some features may be limited based on your new plan's restrictions."
    },
    {
        id: 4,
        question: "Do you offer custom enterprise solutions?",
        answer: "Absolutely! Our Enterprise plan is fully customizable. Contact our sales team to discuss your specific requirements and pricing."
    }
];

export default function FrequentlyAskedQuestions() {
    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-[20px]">
            <div className="mb-[24px]">
                <h2 className="text-[20px] font-normal text-gray-900 dark:text-white">
                    Frequently Asked Questions
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {faqs.map((faq) => (
                    <FAQCard 
                        key={faq.id} 
                        question={faq.question} 
                        answer={faq.answer} 
                    />
                ))}
            </div>
        </div>
    )
}
