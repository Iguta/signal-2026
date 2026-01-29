import type { Category } from '../types/category'
import { DEFAULT_THEMES } from '../types/category'
import { createId } from '../utils/id'
import { hasStorageKey, readStorage, writeStorage } from './storage'

const STORAGE_KEY = 'signal.categories'

const seedCategories = (): Category[] => {
  const base = ['Work', 'Wellness', 'Learning', 'Family']
  const combined = [...DEFAULT_THEMES, ...base]

  return combined.map((name, index) => ({
    id: createId(),
    name,
    color: index % 2 === 0 ? '#8e8dfa' : '#5bc0ff',
  }))
}

const ensureSeed = () => {
  const current = readStorage<Category[]>(STORAGE_KEY, [])
  if (!hasStorageKey(STORAGE_KEY)) {
    const seeded = seedCategories()
    writeStorage(STORAGE_KEY, seeded)
    return seeded
  }
  return current
}

export const getCategories = () => {
  return ensureSeed()
}

export const createCategory = (name: string) => {
  const current = ensureSeed()
  const next = [{ id: createId(), name, color: '#7b5bff' }, ...current]
  writeStorage(STORAGE_KEY, next)
  return next
}
