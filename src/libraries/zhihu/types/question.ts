import { Author } from './author'

interface Question {
  answer_count: number
  author: Author
  bound_topic_ids: number[]
  comment_count: number
  created: number
  detail: string
  excerpt: string
  follower_count: number
  id: number
  is_following: false
  question_type: 'normal'
  relationship: {
    is_author: false
  }
  title: string
  type: 'question'
  url: string

  updated_time: number
}

export type { Question }
