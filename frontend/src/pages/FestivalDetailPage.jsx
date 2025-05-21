"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, Globe, User, RefreshCw } from "lucide-react"

function FestivalDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("info") // "info" or "timetable"
    const [festival, setFestival] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/festivals/${id}`)
                if (!response.ok) {
                    throw new Error("フェス詳細の取得に失敗しました")
                }

                const data = await response.json()
                setFestival(data)
                setIsLoading(false)
            } catch (err) {
                console.error("フェス詳細の取得に失敗しました", err)
                setError("フェス詳細の取得に失敗しました。再度お試しください。")
                setIsLoading(false)
            }
        }

        fetchFestival()
    }, [id])


    // 日付のフォーマット
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}年${month}月${day}日`
    }

    // 日付範囲のフォーマット
    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const startYear = start.getFullYear()
        const startMonth = start.getMonth() + 1
        const startDay = start.getDate()
        const endYear = end.getFullYear()
        const endMonth = end.getMonth() + 1
        const endDay = end.getDate()

        if (startYear === endYear) {
            if (startMonth === endMonth) {
                return `${startYear}年${startMonth}月${startDay}日〜${endDay}日`
            } else {
                return `${startYear}年${startMonth}月${startDay}日〜${endMonth}月${endDay}日`
            }
        } else {
            return `${startYear}年${startMonth}月${startDay}日〜${endYear}年${endMonth}月${endDay}日`
        }
    }

    // 最終更新日のフォーマット
    const formatUpdatedAt = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, "0")}`
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-purple-700 text-white p-4 flex items-center">
                    <button onClick={() => navigate("/festivals")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-semibold">フェス詳細</h1>
                </header>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-purple-700 text-white p-4 flex items-center">
                    <button onClick={() => navigate("/festivals")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-semibold">フェス詳細</h1>
                </header>
                <div className="flex-1 p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 flex items-center gap-1 text-sm text-purple-600"
                        >
                            <RefreshCw size={16} />
                            <span>再読み込み</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* ヘッダー */}
            <header className="bg-purple-700 text-white p-4 flex items-center">
                <button onClick={() => navigate("/festivals")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">フェス詳細</h1>
            </header>

            {/* フェス名 */}
            <div className="bg-purple-700 text-white px-4 pb-4">
                <h2 className="text-xl font-bold">{festival.name}</h2>
                <div className="flex items-center gap-1 text-sm mt-1 text-purple-100">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateRange(festival.start_date, festival.end_date)}</span>
                </div>
            </div>

            {/* タブ */}
            <div className="bg-white border-b">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === "info"
                            ? "text-purple-700 border-b-2 border-purple-700"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        フェス情報
                    </button>
                    <button
                        onClick={() => setActiveTab("timetable")}
                        className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === "timetable"
                            ? "text-purple-700 border-b-2 border-purple-700"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        タイムテーブル
                    </button>
                </div>
            </div>

            {/* コンテンツ */}
            <div className="flex-1 p-4">
                {activeTab === "info" ? (
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        {/* フェス情報 */}
                        <div className="space-y-6">
                            {/* 期間 */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">開催期間</h3>
                                <div className="flex items-start gap-2">
                                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-gray-800">
                                            {formatDate(festival.start_date)} 〜 {formatDate(festival.end_date)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 概要 */}
                            {festival.description && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">概要</h3>
                                    <div className="flex items-start gap-2">
                                        <p className="text-gray-800">{festival.description}</p>
                                    </div>
                                </div>
                            )}

                            {/* 公式URL */}
                            {festival.officialUrl && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">公式サイト</h3>
                                    <div className="flex items-start gap-2">
                                        <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <a
                                            href={festival.officialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 hover:text-purple-800 break-all"
                                        >
                                            {festival.officialUrl}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* 作成者 */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">作成者</h3>
                                <div className="flex items-start gap-2">
                                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <p className="text-gray-800">{festival.createdBy}</p>
                                </div>
                            </div>

                            {/* 最終更新日 */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">最終更新日</h3>
                                <div className="flex items-start gap-2">
                                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <p className="text-gray-800">{formatUpdatedAt(festival.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        {/* タイムテーブル（仮） */}
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold mb-4">タイムテーブル</h3>
                            <p className="text-gray-600 mb-4">
                                このフェスのタイムテーブルはまだ作成されていません。
                                <br />
                                タイムテーブルを作成して、お気に入りのアーティストのスケジュールを管理しましょう！
                            </p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-sm">
                                タイムテーブルを作成する
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FestivalDetailPage
