"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

function DateSelector({ selectedDate, onDateChange, formatSelectedDate }) {
    return (
        <div className="bg-white p-4 border-b flex items-center justify-between">
            <button onClick={() => onDateChange(-1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="前日">
                <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h3 className="font-medium">{formatSelectedDate(selectedDate)}</h3>
            <button onClick={() => onDateChange(1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="翌日">
                <ChevronRight size={20} className="text-gray-600" />
            </button>
        </div>
    )
}

export default DateSelector
