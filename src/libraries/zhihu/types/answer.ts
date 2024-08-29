import { Author, Question } from '.'

interface BizExt {
  share_guide: {
    has_positive_bubble: boolean
    has_time_bubble: boolean
    hit_share_guide_cluster: boolean
  }
}

interface Answer {
  answer_type: 'normal'
  author: Author
  biz_ext: BizExt
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

export type { Answer }
