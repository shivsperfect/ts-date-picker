import { useEffect, useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from "date-fns";

interface Props {
    value: Date | null
    onDateChange: (date: Date) => void
}

const DatePicker = ({ value, onDateChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="date-picker-container">
            <button className="date-picker-button" onClick={() => setIsOpen(val => !val)}>
                {value == null ? 'Select a date' : format(value, 'MMM do, yyyy')}
            </button>
            {isOpen && <DatePickerModal onDateChange={onDateChange} value={value} />}
        </div>
    )
}


const DatePickerModal = ({ value, onDateChange }: Props) => {
    const [visibleMonth, setVisibleMonth] = useState(value || new Date())

    useEffect(() => {
        if (value !== null)
            setVisibleMonth(value)
    }, [value])

    const visibleDates = eachDayOfInterval({
        start: startOfWeek(startOfMonth(visibleMonth)),
        end: endOfWeek(endOfMonth(visibleMonth))
    })

    function showPreviousMonth() {
        setVisibleMonth((date) => {
            return addMonths(date, -1);
        })
    }

    function showNextMonth() {
        setVisibleMonth((date) => {
            return addMonths(date, 1);
        })
    }

    return (
        <div className="date-picker">
            <div className="date-picker-header">
                <button className="prev-month-button month-button" onClick={showPreviousMonth}>&larr;</button>
                <div className="current-month">{value !== null && format(visibleMonth, 'MMMM - yyyy')}</div>
                <button className="next-month-button month-button" onClick={showNextMonth}>&rarr;</button>
            </div>
            <div className="date-picker-grid-header date-picker-grid">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="date-picker-grid-dates date-picker-grid">
                {visibleDates.map(date => {
                    return (
                        <button key={date.toDateString()}
                            className={`date${!isSameMonth(date, visibleMonth) ? ' date-picker-other-month-date' : ''}${isSameDay(date, visibleMonth) ? ' selected' : ''}${isToday(date) ? ' today' : ''}`}
                            onClick={() => onDateChange(date)}
                        >
                            {date.getDate()}
                        </button>
                    )
                })}

            </div>
        </div>
    )
}

export default DatePicker