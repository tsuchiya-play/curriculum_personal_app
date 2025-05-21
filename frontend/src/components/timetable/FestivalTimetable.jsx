"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Edit } from "lucide-react"
import DateSelector from "./DateSelector"
import TimelineGrid from "./TimelineGrid"

function FestivalTimetable({ festival, festivalId }) {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null)
    const [timetableData, setTimetableData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // 初期化
    useEffect(() => {
        if (festival) {
            // 開始日を初期選択日に設定
            setSelectedDate(new Date(festival.start_date))
        }
    }, [festival])

    // 選択日付が変更されたときにタイムテーブルデータを更新
    useEffect(() => {
        if (selectedDate) {
            fetchTimetableForDate(selectedDate)
        }
    }, [selectedDate])

    // 日付に応じたタイムテーブルデータを取得（モック）
    const fetchTimetableForDate = async (date) => {
        setIsLoading(true)

        try {
            // 実際の実装ではAPIからデータを取得
            // ここではモックデータを使用
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate(),
            ).padStart(2, "0")}`

            // APIリクエストをシミュレート
            await new Promise((resolve) => setTimeout(resolve, 500))

            // モックタイムテーブルデータ
            const mockTimetable = {
                id: 1,
                festival_id: Number(festivalId),
                date: formattedDate,
                start_time: "10:00", // タイムテーブルの開始時刻
                end_time: "22:00", // タイムテーブルの終了時刻
                stages: [
                    { id: 1, name: "GRASS STAGE" },
                    { id: 2, name: "PARK STAGE" },
                    { id: 3, name: "LAKE STAGE" },
                    { id: 4, name: "FOREST STAGE" },
                    { id: 5, name: "MOUNTAIN STAGE" },
                    { id: 6, name: "RIVER STAGE" },
                ],
                artists: [
                    {
                        id: 1,
                        name: "ロックバンドA",
                        stage_id: 1,
                        start_time: "12:30",
                        end_time: "13:15",
                        color: "#ef4444", // red-500
                    },
                    {
                        id: 2,
                        name: "ポップアーティストB",
                        stage_id: 2,
                        start_time: "13:00",
                        end_time: "14:00",
                        color: "#3b82f6", // blue-500
                    },
                    {
                        id: 3,
                        name: "インディーバンドC",
                        stage_id: 3,
                        start_time: "14:30",
                        end_time: "15:30",
                        color: "#10b981", // emerald-500
                    },
                    {
                        id: 4,
                        name: "ヒップホップアーティストD",
                        stage_id: 1,
                        start_time: "15:00",
                        end_time: "16:15",
                        color: "#f59e0b", // amber-500
                    },
                    {
                        id: 5,
                        name: "メタルバンドE",
                        stage_id: 4,
                        start_time: "16:00",
                        end_time: "17:30",
                        color: "#8b5cf6", // purple-500
                    },
                    {
                        id: 6,
                        name: "フォークシンガーF",
                        stage_id: 2,
                        start_time: "17:00",
                        end_time: "18:00",
                        color: "#ec4899", // pink-500
                    },
                    {
                        id: 7,
                        name: "エレクトロニックアーティストG",
                        stage_id: 5,
                        start_time: "18:30",
                        end_time: "20:00",
                        color: "#06b6d4", // cyan-500
                    },
                    {
                        id: 8,
                        name: "ジャズバンドH",
                        stage_id: 3,
                        start_time: "19:00",
                        end_time: "20:30",
                        color: "#84cc16", // lime-500
                    },
                    {
                        id: 9,
                        name: "ヘッドライナーI",
                        stage_id: 1,
                        start_time: "20:30",
                        end_time: "22:00",
                        color: "#f43f5e", // rose-500
                    },
                ],
            }

            setTimetableData(mockTimetable)
            setIsLoading(false)
        } catch (error) {
            console.error("タイムテーブルデータの取得に失敗しました", error)
            setIsLoading(false)
        }
    }

    // 日付を切り替える
    const changeDate = (direction) => {
        if (!selectedDate || !festival) return

        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + direction)

        // フェス期間内かチェック
        const startDate = new Date(festival.start_date)
        const endDate = new Date(festival.end_date)
        if (newDate < startDate) {
            setSelectedDate(startDate)
        } else if (newDate > endDate) {
            setSelectedDate(endDate)
        } else {
            setSelectedDate(newDate)
        }
    }

    // 選択中の日付のフォーマット（曜日付き）
    const formatSelectedDate = (date) => {
        if (!date) return ""
        const month = date.getMonth() + 1
        const day = date.getDate()
        const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
        return `${month}月${day}日（${dayOfWeek}）`
    }

    // 時間を数値に変換（例: "14:30" → 14.5）
    const getTimeValue = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number)
        return hours + minutes / 60
    }

    // 時間スロットを生成
    const generateTimeSlots = () => {
        if (!timetableData) return []

        const startTimeValue = getTimeValue(timetableData.start_time)
        const endTimeValue = getTimeValue(timetableData.end_time)

        // 開始時間の時間部分（切り捨て）
        const startHour = Math.floor(startTimeValue)
        // 終了時間の時間部分（切り上げ）
        const endHour = Math.ceil(endTimeValue)

        // 1時間ごとの時間スロットを生成
        return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
            const hour = startHour + i
            return `${hour}:00`
        })
    }

    // 現在時刻のバーを表示するかどうか
    const shouldShowCurrentTimeBar = () => {
        if (!selectedDate || !timetableData) return false

        const today = new Date()
        const isSameDay =
            selectedDate.getFullYear() === today.getFullYear() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() === today.getDate()

        if (!isSameDay) return false

        // 現在時刻がタイムテーブルの表示範囲内かチェック
        const now = new Date()
        const currentTimeValue = now.getHours() + now.getMinutes() / 60
        const startTimeValue = getTimeValue(timetableData.start_time)
        const endTimeValue = getTimeValue(timetableData.end_time)

        return currentTimeValue >= startTimeValue && currentTimeValue <= endTimeValue
    }

    // 現在時刻のバーの位置を計算
    const getCurrentTimePosition = () => {
        if (!timetableData) return 0

        const now = new Date()
        const currentTimeValue = now.getHours() + now.getMinutes() / 60
        const startTimeValue = getTimeValue(timetableData.start_time)
        const endTimeValue = getTimeValue(timetableData.end_time)

        // タイムテーブルの表示範囲内での位置（%）
        return ((currentTimeValue - startTimeValue) / (endTimeValue - startTimeValue)) * 100
    }

    // アーティストの位置とサイズを計算する関数
    const getArtistPositionAndSize = (artist) => {
        if (!timetableData) return { top: 0, height: 0, left: 0, width: 0 }

        const startTimeValue = getTimeValue(artist.start_time)
        const endTimeValue = getTimeValue(artist.end_time)
        const timetableStartValue = getTimeValue(timetableData.start_time)
        const timetableEndValue = getTimeValue(timetableData.end_time)

        // タイムテーブルの表示範囲内での位置（%）
        const top = ((startTimeValue - timetableStartValue) / (timetableEndValue - timetableStartValue)) * 100
        // 高さ（%）
        const height = ((endTimeValue - startTimeValue) / (timetableEndValue - timetableStartValue)) * 100

        // ステージの位置を特定
        const stageIndex = timetableData.stages.findIndex((stage) => stage.id === artist.stage_id)
        if (stageIndex === -1) return { top: 0, height: 0, left: 0, width: 0 }

        // 左位置と幅
        const left = `${stageIndex * 180}px`
        const width = "180px"

        return { top, height, left, width }
    }

    if (!festival || !selectedDate || isLoading) {
        return <div className="flex-1 flex items-center justify-center">読み込み中...</div>
    }

    if (!timetableData) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">この日のタイムテーブルはまだ作成されていません</p>
            </div>
        )
    }

    const timeSlots = generateTimeSlots()

    return (
        <div className="flex flex-col h-full">
            {/* 日付選択 */}
            <DateSelector selectedDate={selectedDate} onDateChange={changeDate} formatSelectedDate={formatSelectedDate} />

            {/* タイムテーブル情報 */}
            <div className="bg-white px-4 py-2 border-b flex justify-between items-center text-sm">
                <div className="text-gray-600">
                    開始: <span className="font-medium">{timetableData.start_time}</span>
                </div>
                <div className="text-gray-600">
                    終了: <span className="font-medium">{timetableData.end_time}</span>
                </div>
            </div>

            {/* タイムテーブル */}
            <TimelineGrid
                timeSlots={timeSlots}
                stages={timetableData.stages}
                artists={timetableData.artists}
                getArtistPositionAndSize={getArtistPositionAndSize}
                shouldShowCurrentTimeBar={shouldShowCurrentTimeBar()}
                getCurrentTimePosition={getCurrentTimePosition}
            />

            {/* 編集ボタン */}
            <div className="bg-white p-4 border-t flex justify-end">
                <button
                    onClick={() => navigate(`/festivals/${festivalId}/timetable/edit`)}
                    className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-sm"
                >
                    <Edit size={16} />
                    <span>タイムテーブルを編集</span>
                </button>
            </div>
        </div>
    )
}

export default FestivalTimetable
