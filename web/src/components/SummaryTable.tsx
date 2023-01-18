import { generateDatesFromYearBeginning } from "../utils/generate-days-from-year-beginning.ts"
import { HabitDayBlock } from "./HabitDayBlock"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minDayBlocks = 18 * 7 //18 weeks * 7 days
const amountOfDaysToFill = minDayBlocks - summaryDates.length

export function SummaryTable() {
    return (
        <div className="w-full flex ">
            {/* WEEKDAY HEADER */}
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div
                            key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
                        >
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            
            {/* DAY BLOCKS */}
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(date => {
                    return <HabitDayBlock key={date.toString()} />
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>

        </div>
    )
}