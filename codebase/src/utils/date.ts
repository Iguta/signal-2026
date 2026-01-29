export const formatShortDate = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export const formatLongDate = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const toInputDate = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getMonthDays = (reference: Date) => {
  const year = reference.getFullYear()
  const month = reference.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = [] as { date: Date; day: number; iso: string }[]

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day)
    days.push({ date, day, iso: toInputDate(date) })
  }

  return { firstDay, lastDay, days }
}

export const getWeekRange = (reference: Date) => {
  const date = new Date(reference)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(date.setDate(diff))
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  start.setHours(0, 0, 0, 0)
  return { start, end }
}

export const getDayRange = (reference: Date) => {
  const start = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate())
  const end = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate(), 23, 59, 59, 999)
  return { start, end }
}
