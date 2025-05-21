"use client"

import { useRef, useEffect } from "react"
import CurrentTimeIndicator from "./CurrentTimeIndicator"

function TimelineGrid({ timeSlots, stages, shouldShowCurrentTimeBar, getCurrentTimePosition }) {
    const scrollContainerRef = useRef(null)

    // 現在時刻のバーが表示される場合、スクロール位置を調整
    useEffect(() => {
        if (shouldShowCurrentTimeBar && scrollContainerRef.current) {
            const position = getCurrentTimePosition()
            const containerHeight = scrollContainerRef.current.clientHeight
            const scrollPosition = (position / 100) * scrollContainerRef.current.scrollHeight - containerHeight / 2

            if (scrollPosition > 0) {
                scrollContainerRef.current.scrollTop = scrollPosition
            }
        }
    }, [shouldShowCurrentTimeBar, getCurrentTimePosition])

    return (
        <div className="flex-1 overflow-hidden" ref={scrollContainerRef}>
            <div className="flex">
                {/* 時間軸 - 固定表示 */}
                <div className="sticky left-0 z-10 bg-white border-r">
                    <div className="h-10"></div> {/* ステージ名ヘッダーと同じ高さの空白 */}
                    <div>
                        {timeSlots.map((time, index) => (
                            <div key={index} className="h-16 w-12 flex items-center justify-center text-xs text-gray-500">
                                {time}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ステージと時間枠 - スクロール可能 */}
                <div className="overflow-x-auto">
                    <div style={{ minWidth: stages.length * 180 + "px" }}>
                        {/* ステージ名ヘッダー - 上部に固定 */}
                        <div className="flex border-b sticky top-0 bg-white z-10 h-10">
                            {stages.map((stage) => (
                                <div
                                    key={stage.id}
                                    className="w-[180px] p-2 text-center font-medium text-sm border-r last:border-r-0 truncate"
                                >
                                    {stage.name}
                                </div>
                            ))}
                        </div>

                        {/* 時間枠 */}
                        <div className="relative">
                            {/* 時間帯の区切り線 */}
                            {timeSlots.map((_, index) => (
                                <div key={index} className="h-16 border-b border-gray-200 flex">
                                    {stages.map((stage) => (
                                        <div key={stage.id} className="w-[180px] border-r last:border-r-0"></div>
                                    ))}
                                </div>
                            ))}

                            {/* 現在時刻のバー */}
                            {shouldShowCurrentTimeBar && <CurrentTimeIndicator position={getCurrentTimePosition()} />}

                            {/* ここにアーティストの出演枠を表示（後で実装） */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineGrid
