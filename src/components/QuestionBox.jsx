function QuestionBox({ question }) {
    return (
        <div className="p-6 bg-white border border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                    Interview Question
                </h2>

                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-500/10 dark:text-blue-400">
                    AI Generated
                </span>
            </div>

            <div className="pl-5 border-l-4 border-blue-500">

                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                    {question}
                </p>
            </div>
        </div>
    )
}

export default QuestionBox