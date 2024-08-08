interface Recommend {
  paging: Paging
  fresh_text: string
  data: { target: Target }[]
}

type Target = AnswerTarget

interface Author {
  id: string
  name: string
  headline: string
  avatar_url: string
  user_type: 'people'

  followers_count: number

  gender: 0
  is_org: boolean
  is_followed: boolean
  is_following: boolean

  url: string
  url_token: string
}

interface Question {
  id: number
  title: string
  author: Author
  type: 'question'
  question_type: 'normal'

  answer_count: number
  comment_count: number
  follower_count: number
  bound_topic_ids: number[]

  created: number
  detail: string
  excerpt: string

  is_following: boolean
  relationship: {
    is_author: boolean
  }
  url: string
}

interface AnswerTarget {
  id: number
  type: 'answer'
  answer_type: 'normal'
  author: Author

  comment_count: number
  favorite_count: number
  thanks_count: number
  visited_count: number
  voteup_count: number

  content: string
  excerpt: string
  excerpt_new: string
  preview_text: string
  preview_type: 'default'
  thumbnail?: string
  thumbnails?: string[]

  created_time: number
  updated_time: number

  is_copyable: boolean
  is_labeled: boolean

  question: Question
  relationship: {
    is_nothelp: boolean
    is_thanked: boolean
    voting: 0
  }
  reshipment_settings: 'allowed'
  url: string
}

interface Answer {
  answer_type: 'normal'
  author: Author
  biz_ext: Record<string, unknown>
  content_need_truncated: boolean
  created_time: number
  extras: string
  id: number
  is_collapsed: boolean
  is_copyable: boolean
  is_jump_native: boolean
  question: Question
  relationship: {
    upvoted_followees: unknown[]
  }
  type: 'answer'
  updated_time: number
  url: string

  content: string
}

interface Paging {
  is_end: boolean
  is_start: boolean
  next: string
  previous: string
  totals: number
}

export type { Recommend, Author, Question, AnswerTarget, Target, Answer }
