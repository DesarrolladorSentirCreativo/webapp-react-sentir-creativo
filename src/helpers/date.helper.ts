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
