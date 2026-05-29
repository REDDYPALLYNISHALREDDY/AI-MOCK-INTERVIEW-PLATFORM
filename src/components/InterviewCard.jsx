function InterviewCard({ title, level, description }) {
    return (
        <div className="p-6 transition-all duration-300 bg-white border cursor-pointer border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl hover:border-slate-400 dark:hover:border-slate-700">
            <h2 className="mb-3 text-xl font-semibold leading-8 text-black dark:text-white">
                {title}
            </h2>

            <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {description}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {level}
                </span>

                <button className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                    Start
                </button>
            </div>
        </div>
    )
}

export default InterviewCard