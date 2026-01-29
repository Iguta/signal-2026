export const readStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const writeStorage = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const hasStorageKey = (key: string) => {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(key) !== null
}
