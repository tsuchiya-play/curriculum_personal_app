function CurrentTimeIndicator({ position }) {
    // positionがピクセル値かパーセンテージかを判断
    const isPixelValue = typeof position === "number"

    const style = isPixelValue ? { top: `${position}px` } : { top: `${position}%` }

    return (
        <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-20" style={style}>
            <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-red-500"></div>
        </div>
    )
}

export default CurrentTimeIndicator
