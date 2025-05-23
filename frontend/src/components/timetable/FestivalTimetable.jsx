"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Edit } from "lucide-react"
import DateSelector from "./DateSelector"
import TimelineGrid from "./TimelineGrid"
import { formatDate } from "../../utils/formatDate"

function FestivalTimetable({ festival, festivalId}) {
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
        const fetchTimetable = async () => {
            try {
                setIsLoading(true);
                const formatedDate = formatDate(selectedDate)
                const res = await fetch(
                    `http://localhost:3000/api/v1/festivals/${festivalId}/timetable?date=${formatedDate}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch timetable");
                }
                const data = await res.json();
                setTimetableData(data);
            } catch (error) {
                console.error("エラー:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (festivalId && selectedDate) {
            fetchTimetable();
        }
    }, [festivalId, selectedDate]);

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
        const startTimeValue = getTimeValue(timetableData.timetables.start_time)
        const endTimeValue = getTimeValue(timetableData.timetables.end_time)

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
        const startTimeValue = getTimeValue(timetableData.timetables.start_time)
        const endTimeValue = getTimeValue(timetableData.timetables.end_time)

        return currentTimeValue >= startTimeValue && currentTimeValue <= endTimeValue
    }

    // 現在時刻のバーの位置を計算
    const getCurrentTimePosition = () => {
        if (!timetableData) return 0

        const now = new Date()
        const currentTimeValue = now.getHours() + now.getMinutes() / 60
        const startTimeValue = getTimeValue(timetableData.timetables.start_time)

        // 時間スロットの高さ（ピクセル）
        const timeSlotHeight = 64 // h-16 = 4rem = 64px

        // タイムテーブルの開始時間からの経過時間（時間単位）
        const hoursFromStart = currentTimeValue - startTimeValue

        // 開始位置（ピクセル）
        return hoursFromStart * timeSlotHeight
    }

    // アーティストの位置とサイズを計算する関数
    const getArtistPositionAndSize = (artist, stageWidth = 90) => {
        if (!timetableData) return { top: 0, height: 0, left: 0, width: 0 }

        const startTimeValue = getTimeValue(artist.start_time)
        const endTimeValue = getTimeValue(artist.end_time)
        const timetableStartValue = getTimeValue(timetableData.timetables.start_time)

        // 時間スロットの高さ（ピクセル）
        const timeSlotHeight = 64 // h-16 = 4rem = 64px

        // タイムテーブルの開始時間からの経過時間（時間単位）
        const hoursFromStart = startTimeValue - timetableStartValue
        // 出演時間（時間単位）
        const durationHours = endTimeValue - startTimeValue

        // 開始位置（ピクセル）
        const topPixels = hoursFromStart * timeSlotHeight
        // 高さ（ピクセル）
        const heightPixels = durationHours * timeSlotHeight

        // ステージの位置を特定
        const stageIndex = timetableData.timetables.stages.findIndex((stage) => stage.id === artist.stage_id)
        if (stageIndex === -1) return { top: 0, height: 0, left: 0, width: 0 }

        // 左位置と幅
        const left = stageIndex * stageWidth
        const width = stageWidth

        return {
            top: topPixels,
            height: heightPixels,
            left,
            width,
        }
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
                    開始: <span className="font-medium">{timetableData.timetables.start_time}</span>
                </div>
                <div className="text-gray-600">
                    終了: <span className="font-medium">{timetableData.timetables.end_time}</span>
                </div>
            </div>

            {/* タイムテーブル */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TimelineGrid
                    timeSlots={timeSlots}
                    stages={timetableData.timetables.stages}
                    artists={timetableData.timetables.artists}
                    getArtistPositionAndSize={getArtistPositionAndSize}
                    shouldShowCurrentTimeBar={shouldShowCurrentTimeBar()}
                    getCurrentTimePosition={getCurrentTimePosition}
                />
            </div>

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
