import { Calendar, PlusCircle, AlertCircle } from "lucide-react"

function TopPage({ isLoggedIn }) {
    return (
        <div className="p-6 flex flex-col items-center justify-center" style={{ minHeight: "calc(800px - 64px)" }}>
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4 text-purple-800">フェスタイム</h1>
                <p className="text-gray-600 mb-6">
                    音楽フェスのタイムテーブルを簡単に作成・共有できるアプリです。
                    お気に入りのアーティストを見逃さないようにスケジュールを管理しましょう！
                </p>
            </div>

            <div className="w-full space-y-6">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">フェス一覧を見る</span>
                </button>

                {isLoggedIn ? (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors">
                        <PlusCircle className="h-5 w-5" />
                        <span className="font-medium">フェスを作成する</span>
                    </button>
                ) : (
                    <div className="w-full border border-gray-300 bg-gray-50 p-4 rounded-lg text-center">
                        <button className="w-full bg-gray-400 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 mb-3 cursor-not-allowed">
                            <PlusCircle className="h-5 w-5" />
                            <span className="font-medium">フェスを作成する</span>
                        </button>
                        <div className="flex items-center justify-center text-sm text-gray-600 gap-1">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span>フェスを作成するにはログインが必要です</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm">
                <p>© 2023 フェスタイム All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default TopPage
