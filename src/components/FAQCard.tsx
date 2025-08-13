export default function FAQCard({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] border border-gray-200 dark:border-gray-600 p-[24px]">
            <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-3">
                {question}
            </h3>
            <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {answer}
            </p>
        </div>
    )
}