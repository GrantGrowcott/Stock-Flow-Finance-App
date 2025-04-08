'use client'

type YearDropdownProps = {
    selectedYears: number
    setSelectedYears: (years:number) => void
}

export default function YearDropdown({ selectedYears, setSelectedYears }: YearDropdownProps) {
  

console.log(selectedYears)

  return (
    <div className="mt-2 mb-10">
      <label htmlFor="years" className="block mb-1 font-medium">
        Select Term:
      </label>
      <select
        id="years"
        value={selectedYears}
        onChange={(e) => setSelectedYears(Number(e.target.value))}
        className="border rounded px-3 py-2"
      >
        <option value={5}>5 Years</option>
        <option value={10}>10 Years</option>
      </select>
    </div>
  )
}
