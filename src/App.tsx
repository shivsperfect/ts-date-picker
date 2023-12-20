import { useState } from "react"
import DatePicker from "./DatePicker"

function App() {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <>
      <DatePicker value={value} onDateChange={(date: Date) => setValue(date)} />
    </>
  )
}

export default App
