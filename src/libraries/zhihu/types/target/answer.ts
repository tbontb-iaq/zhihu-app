import { Author } from '../author'
import { Question } from '../question'

interface AnswerTarget {
  answer_type: 'normal'
  author: Author
  comment_count: number
  content: string
  created_time: number
  excerpt: string
  excerpt_new: string
  favorite_count: number
  id: number
  is_copyable: boolean
  is_labeled: boolean
  preview_text: string
  preview_type: 'default'
  question: Question
  relationship: {
    is_nothelp: boolean
    is_thanked: boolean
    voting: 0
  }
  reshipment_settings: 'allowed'
  thanks_count: number
  type: 'answer'
  updated_time: number
  url: string
  visited_count: number
  voteup_count: number
}

export type { AnswerTarget }
