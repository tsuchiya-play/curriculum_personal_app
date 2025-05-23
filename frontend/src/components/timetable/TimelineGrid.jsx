"use client"

import { useRef, useEffect } from "react"
import CurrentTimeIndicator from "./CurrentTimeIndicator"
import ArtistSlot from "./ArtistSlot"

function TimelineGrid({
    timeSlots,
    stages,
    artists,
    getArtistPositionAndSize,
    shouldShowCurrentTimeBar,
    getCurrentTimePosition,
    timetableHeight,
    timetableData,
}) {
    // メインのスクロールコンテナ参照
    const mainScrollContainerRef = useRef(null)

    // 現在時刻のバーが表示される場合、スクロール位置を調整
    useEffect(() => {
        if (shouldShowCurrentTimeBar && mainScrollContainerRef.current) {
            const position = getCurrentTimePosition()
            const containerHeight = mainScrollContainerRef.current.clientHeight
            const scrollPosition = position - containerHeight / 2

            if (scrollPosition > 0) {
                mainScrollContainerRef.current.scrollTop = scrollPosition
            }
        }
    }, [shouldShowCurrentTimeBar, getCurrentTimePosition])

    // ステージの幅を縮小（スマホ向け）
    const stageWidth = 90

    // 時間を数値に変換（例: "14:30" → 14.5）
    const getTimeValue = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number)
        return hours + minutes / 60
    }

    // 時間スロットの実際の高さを計算（分単位の時間に対応）
    const getTimeSlotHeight = (index) => {
        if (!timetableData) return 64

        const timeSlotHeight = 64 // 1時間あたりのピクセル数
        const startTimeValue = getTimeValue(timetableData.timetables.start_time)
        const endTimeValue = getTimeValue(timetableData.timetables.end_time)

        // 各時間スロットの開始時間を計算
        const slotStartHour = Math.floor(startTimeValue) + index
        const slotEndHour = slotStartHour + 1

        // 実際の表示範囲との交差部分を計算
        const actualStart = Math.max(slotStartHour, startTimeValue)
        const actualEnd = Math.min(slotEndHour, endTimeValue)

        if (actualEnd <= actualStart) return 0

        // 実際の高さを計算
        const actualDuration = actualEnd - actualStart
        return actualDuration * timeSlotHeight
    }

    // 時間スロットの上部オフセットを計算
    const getTimeSlotTopOffset = (index) => {
        if (!timetableData || index === 0) return 0

        const timeSlotHeight = 64
        const startTimeValue = getTimeValue(timetableData.timetables.start_time)
        const firstSlotStartHour = Math.floor(startTimeValue)

        // 最初のスロットの開始位置のオフセット
        const firstSlotOffset = (startTimeValue - firstSlotStartHour) * timeSlotHeight

        return index === 0 ? firstSlotOffset : 0
    }

    return (
        <div className="flex-1 relative overflow-hidden">
            {/* メインのスクロールコンテナ - 縦横両方スクロール可能 */}
            <div ref={mainScrollContainerRef} className="h-[600px] overflow-auto">
                <div className="relative" style={{ minWidth: stages.length * stageWidth + 40 + "px" }}>
                    {/* ステージ名ヘッダー - 上部に固定 */}
                    <div className="sticky top-0 left-0 z-20 flex bg-white border-b">
                        {/* 左上の空白セル */}
                        <div className="w-10 h-10 bg-white border-r z-30 sticky left-0"></div>

                        {/* ステージ名 */}
                        <div className="flex">
                            {stages.map((stage) => (
                                <div
                                    key={stage.id}
                                    className="p-1 text-center font-medium text-xs border-r last:border-r-0 truncate"
                                    style={{ width: `${stageWidth}px`, minWidth: `${stageWidth}px` }}
                                >
                                    {stage.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* コンテンツエリア */}
                    <div className="flex">
                        {/* 時間軸 - 左側に固定 */}
                        <div className="sticky left-0 z-30 bg-white border-r">
                            <div className="relative">
                                {timeSlots.map((time, index) => {
                                    const height = getTimeSlotHeight(index)
                                    const topOffset = getTimeSlotTopOffset(index)

                                    if (height === 0) return null

                                    return (
                                        <div
                                            key={index}
                                            className="w-10 relative"
                                            style={{
                                                height: `${height}px`,
                                                marginTop: index === 0 ? `${topOffset}px` : "0px",
                                            }}
                                        >
                                            {/* 時間表示をグリッド線に合わせる */}
                                            <div className="absolute top-0 left-0 w-full flex justify-center text-xs text-gray-500 -translate-y-1/2">
                                                {time}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* ステージと時間枠 */}
                        <div>
                            <div style={{ minWidth: stages.length * stageWidth + "px" }}>
                                {/* 時間枠 */}
                                <div className="relative" style={{ height: `${timetableHeight}px` }}>
                                    {/* 時間帯の区切り線 */}
                                    {timeSlots.map((_, index) => {
                                        const height = getTimeSlotHeight(index)
                                        const topOffset = getTimeSlotTopOffset(index)
                                        let cumulativeTop = 0

                                        // 累積の上部位置を計算
                                        for (let i = 0; i < index; i++) {
                                            cumulativeTop += getTimeSlotHeight(i)
                                        }
                                        if (index === 0) cumulativeTop += topOffset

                                        if (height === 0) return null

                                        return (
                                            <div key={index}>
                                                {/* 各時間枠の上部にボーダーを表示 */}
                                                <div
                                                    className="absolute left-0 right-0 border-t border-gray-200"
                                                    style={{ top: `${cumulativeTop}px` }}
                                                ></div>
                                                <div
                                                    className="flex"
                                                    style={{
                                                        position: "absolute",
                                                        top: `${cumulativeTop}px`,
                                                        height: `${height}px`,
                                                        width: "100%",
                                                    }}
                                                >
                                                    {stages.map((stage) => (
                                                        <div
                                                            key={stage.id}
                                                            className="border-r last:border-r-0"
                                                            style={{ width: `${stageWidth}px` }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* 現在時刻のバー */}
                                    {shouldShowCurrentTimeBar && <CurrentTimeIndicator position={getCurrentTimePosition()} />}

                                    {/* アーティスト出演枠 */}
                                    <div className="absolute top-0 left-0 right-0 bottom-0">
                                        {artists &&
                                            artists.map((artist) => (
                                                <ArtistSlot
                                                    key={artist.id}
                                                    artist={artist}
                                                    getPositionAndSize={(artist) => getArtistPositionAndSize(artist, stageWidth)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineGrid
