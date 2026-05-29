import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import '../index.css'

function Results() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Sidebar />

            <div className="ml-64">
                <Navbar />

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-10">
                        Interview Results
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                            <h2 className="text-slate-400 mb-2">Score</h2>
                            <p className="text-5xl text-green-400 font-bold">85%</p>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                            <h2 className="text-slate-400 mb-2">Confidence</h2>
                            <p className="text-5xl text-blue-400 font-bold">78%</p>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                            <h2 className="text-slate-400 mb-2">Communication</h2>
                            <p className="text-5xl text-yellow-400 font-bold">81%</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                        <h2 className="text-2xl text-white font-bold mb-5">
                            AI Feedback
                        </h2>

                        <p className="text-slate-300 leading-8 text-lg">
                            Your explanation was good and technically correct. However, 
                            you should improve communication clarity and provide more 
                            real-world examples while answering.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results