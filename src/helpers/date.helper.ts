const shortFormatOptions: DateTimeFormatOptions = {
  year: 'numeric', // Cambiar a "numeric" o "2-digit"
  month: 'short',
  day: 'numeric'
}

const longFormatOptions: DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric', // Cambiar a "numeric" o "2-digit"
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

interface DateTimeFormatOptions {
  weekday?: 'narrow' | 'short' | 'long'
  era?: 'narrow' | 'short' | 'long'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long'
}

export const formatDate = (date: Date, long = true): string => {
  return new Date(date).toLocaleString(
    'es-CL',
    long ? longFormatOptions : shortFormatOptions
  )
}

export const formatDateInput = (date: Date): string => {
  if (!date) return ''
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  )
  const year = adjustedDate.getFullYear()
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0')
  const day = adjustedDate.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
