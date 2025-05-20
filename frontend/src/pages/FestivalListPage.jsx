"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, User, Clock, ChevronRight, Search, AlertCircle } from "lucide-react"
import Layout from "../components/Layout"

function FestivalListPage({ isLoggedIn }) {
    const navigate = useNavigate()
    const [festivals, setFestivals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/festivals", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error("フェスデータの取得に失敗しました")
                }

                const data = await response.json()
                setFestivals(data.festivals || data) // APIの形式に応じて適宜調整
                setIsLoading(false)
            } catch (err) {
                console.error("フェスデータの取得に失敗しました", err)
                setError("フェスデータの取得に失敗しました。再度お試しください。")
                setIsLoading(false)
            }
        }

        fetchFestivals()
    }, [])

    // 日付のフォーマット
    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const startMonth = start.getMonth() + 1
        const startDay = start.getDate()
        const endMonth = end.getMonth() + 1
        const endDay = end.getDate()

        if (startMonth === endMonth) {
            return `${startMonth}月${startDay}日〜${endDay}日`
        } else {
            return `${startMonth}月${startDay}日〜${endMonth}月${endDay}日`
        }
    }

    // 検索フィルター
    const filteredFestivals = festivals.filter(
        (festival) =>
            festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            festival.createdBy.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <Layout isLoggedIn={isLoggedIn}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">フェス一覧</h1>

                {/* 検索バー */}
                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="フェス名・作成者で検索"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700">{error}</p>
                    </div>
                ) : filteredFestivals.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                            {searchTerm ? "検索条件に一致するフェスが見つかりませんでした" : "フェスが登録されていません"}
                        </p>
                        {isLoggedIn && (
                            <button
                                onClick={() => navigate("/create-festival")}
                                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                            >
                                フェスを作成する
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredFestivals.map((festival) => (
                            <div
                                key={festival.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                onClick={() => navigate(`/festivals/${festival.id}`)}
                            >
                                <div className="p-4 cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-semibold text-purple-800 mb-2">{festival.name}</h2>
                                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                    </div>

                                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>{festival.createdBy}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <span>{formatDateRange(festival.start_date, festival.end_date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 作成ボタン（ログイン時のみ表示） */}
                {isLoggedIn && filteredFestivals.length > 0 && (
                    <div className="fixed bottom-6 right-6">
                        <button
                            onClick={() => navigate("/create-festival")}
                            className="bg-purple-600 hover:bg-purple-700 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
                            aria-label="フェスを作成"
                        >
                            <span className="text-2xl">+</span>
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default FestivalListPage
