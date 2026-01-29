import { useEffect, useState } from 'react'
import type { Category } from '../types/category'
import * as categoryService from '../services/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(categoryService.getCategories())
  }, [])

  const createCategory = (name: string) => {
    if (!name.trim()) return
    setCategories(categoryService.createCategory(name.trim()))
  }

  return { categories, createCategory }
}
