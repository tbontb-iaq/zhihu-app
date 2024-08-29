import { Target } from './target'

interface Paging {
  is_end: boolean
  is_start: boolean
  next: string
  previous: string
  totals: number
}

interface Recommend {
  paging: Paging
  fresh_text: string
  styles: unknown[]
  data: { target: Target }[]
}

export type { Recommend }
