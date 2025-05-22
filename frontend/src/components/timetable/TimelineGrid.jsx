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

    return (
        <div className="flex-1 relative overflow-hidden">
            {/* メインのスクロールコンテナ - 縦横両方スクロール可能 */}
            <div ref={mainScrollContainerRef} className="h-full overflow-auto">
                <div className="relative" style={{ minWidth: stages.length * 180 + 48 + "px" }}>
                    {/* ステージ名ヘッダー - 上部に固定 */}
                    <div className="sticky top-0 left-0 z-20 flex bg-white border-b">
                        {/* 左上の空白セル */}
                        <div className="w-12 h-10 bg-white border-r z-30 sticky left-0"></div>

                        {/* ステージ名 */}
                        <div className="flex">
                            {stages.map((stage) => (
                                <div
                                    key={stage.id}
                                    className="w-[180px] min-w-[180px] p-2 text-center font-medium text-sm border-r last:border-r-0 truncate"
                                >
                                    {stage.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* コンテンツエリア */}
                    <div className="flex">
                        {/* 時間軸 - 左側に固定 */}
                        <div className="sticky left-0 z-10 bg-white border-r">
                            <div className="relative">
                                {timeSlots.map((time, index) => (
                                    <div key={index} className="h-16 w-12 relative">
                                        {/* 時間表示をグリッド線に合わせる */}
                                        <div className="absolute top-0 left-0 w-full flex justify-center text-xs text-gray-500 -translate-y-1/2">
                                            {time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ステージと時間枠 */}
                        <div>
                            <div style={{ minWidth: stages.length * 180 + "px" }}>
                                {/* 時間枠 */}
                                <div className="relative">
                                    {/* 時間帯の区切り線 */}
                                    {timeSlots.map((_, index) => (
                                        <div key={index} className="h-16 flex">
                                            {/* 各時間枠の上部にボーダーを表示 */}
                                            <div
                                                className="absolute left-0 right-0 border-t border-gray-200"
                                                style={{ top: index * 64 }}
                                            ></div>
                                            {stages.map((stage) => (
                                                <div key={stage.id} className="w-[180px] border-r last:border-r-0"></div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* 現在時刻のバー */}
                                    {shouldShowCurrentTimeBar && <CurrentTimeIndicator position={getCurrentTimePosition()} />}

                                    {/* アーティスト出演枠 */}
                                    {artists &&
                                        artists.map((artist) => (
                                            <ArtistSlot key={artist.id} artist={artist} getPositionAndSize={getArtistPositionAndSize} />
                                        ))}
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
