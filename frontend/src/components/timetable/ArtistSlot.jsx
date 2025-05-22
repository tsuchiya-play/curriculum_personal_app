function ArtistSlot({ artist, getPositionAndSize }) {
    const { top, height, left, width } = getPositionAndSize(artist)

    return (
        <div
            className="absolute rounded-md overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow z-10"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `${left}px`,
                width: `${width}px`,
            }}
        >
            <div className="h-1" style={{ backgroundColor: artist.color || "#8b5cf6" }} />
            <div className="p-1">
                <h4 className="font-medium text-xs truncate">{artist.name}</h4>
                <p className="text-[10px] text-gray-500 truncate">
                    {artist.start_time} - {artist.end_time}
                </p>
            </div>
        </div>
    )
}

export default ArtistSlot
