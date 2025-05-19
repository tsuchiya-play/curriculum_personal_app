"use client"

import { Calendar, PlusCircle, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function TopPage({ isLoggedIn, message }) {
    const navigate = useNavigate()

    return (
        <div className="p-6 flex flex-col items-center justify-center" style={{ minHeight: "calc(800px - 64px)" }}>
            {message && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {message}
                </div>
            )}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4 text-purple-800">フェスタイム</h1>
                <p className="text-gray-600 mb-6">
                    音楽フェスのタイムテーブルを簡単に作成・共有できるアプリです。
                    お気に入りのアーティストを見逃さないようにスケジュールを管理しましょう！
                </p>
            </div>

            <div className="w-full space-y-6">
                <button
                    onClick={() => navigate("/festivals")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">フェス一覧を見る</span>
                </button>

                {isLoggedIn ? (
                    <button
                        onClick={() => navigate("/create-festival")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span className="font-medium">フェスを作成する</span>
                    </button>
                ) : (
                    <div className="w-full border border-gray-300 bg-gray-50 p-4 rounded-lg text-center">
                        <button className="w-full bg-gray-400 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 mb-3 cursor-not-allowed">
                            <PlusCircle className="h-5 w-5" />
                            <span className="font-medium">フェスを作成する</span>
                        </button>
                        <div className="flex flex-col items-center justify-center text-sm text-gray-600 gap-1">
                            <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                                <span>フェスを作成するにはログインが必要です</span>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="mt-2 text-purple-600 hover:text-purple-800 font-medium"
                            >
                                ログインはこちら
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm">
                <p>© 2025 フェスタイム All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default TopPage
