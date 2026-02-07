// src/types.ts

// 1. User Profile (Keep this)
export interface UserData {
  name: string
  age: string
  height: string
  weight: string
  diet: 'Normal' | 'Halal' | 'Vegetarian' | 'Vegan'
  isPregnant: boolean
}

// 2. NEW: The Real Food Score Response
export interface RealFoodAnalysis {
  score: number
  bar: {
    positive_ratio: number // e.g. 0.6
    negative_ratio: number // e.g. 0.4
  }
  reasons: {
    positives: string[]
    concerns: string[]
  }
  ingredients_breakdown: {
    helpful: string[]
    concerning: string[]
    mixed: string[]
    neutral: string[]
  }
  // Optional extras if you want them later
  sources_consulted?: { source: string; how_used: string }[]
}