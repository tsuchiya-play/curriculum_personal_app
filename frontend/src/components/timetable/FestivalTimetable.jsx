"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Edit } from "lucide-react"
import DateSelector from "./DateSelector"
import TimelineGrid from "./TimelineGrid"

function FestivalTimetable({ festival, festivalId }) {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null)
    const [stages, setStages] = useState([])

    // 初期化
    useEffect(() => {
        if (festival) {
            // 開始日を初期選択日に設定
            setSelectedDate(new Date(festival.start_date))

            // モックステージデータ - より多くのステージを追加
            const mockStages = [
                { id: 1, name: "GRASS STAGE" },
                { id: 2, name: "PARK STAGE" },
                { id: 3, name: "LAKE STAGE" },
                { id: 4, name: "FOREST STAGE" },
                { id: 5, name: "MOUNTAIN STAGE" },
                { id: 6, name: "RIVER STAGE" },
            ]
            setStages(mockStages)
        }
    }, [festival])

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
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
        return `${month}月${day}日（${dayOfWeek}）`
    }

    // 現在時刻のバーを表示するかどうか
    const shouldShowCurrentTimeBar = () => {
        if (!selectedDate) return false
        const today = new Date()
        return (
            selectedDate.getFullYear() === today.getFullYear() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() === today.getDate()
        )
    }

    // 現在時刻のバーの位置を計算
    const getCurrentTimePosition = () => {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        // 6:00から23:00までの17時間を100%とする
        const startHour = 6
        const totalHours = 17
        const currentHoursSinceStart = hours + minutes / 60 - startHour
        return (currentHoursSinceStart / totalHours) * 100
    }

    // 時間帯の生成（6:00から23:00まで1時間ごと）
    const timeSlots = Array.from({ length: 18 }, (_, i) => {
        const hour = i + 6
        return `${hour}:00`
    })

    if (!festival || !selectedDate) {
        return <div className="flex-1 flex items-center justify-center">読み込み中...</div>
    }

    return (
        <div className="flex flex-col h-full">
            {/* 日付選択 */}
            <DateSelector selectedDate={selectedDate} onDateChange={changeDate} formatSelectedDate={formatSelectedDate} />

            {/* タイムテーブル */}
            <TimelineGrid
                timeSlots={timeSlots}
                stages={stages}
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
