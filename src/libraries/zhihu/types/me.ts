interface Me {
  id: string
  url_token: string
  name: string
  use_default_avatar: boolean
  avatar_url: string
  avatar_url_template: string
  is_org: boolean
  type: 'people'
  url: string
  user_type: 'people'
  headline: string
  headline_render: string
  gender: 1
  is_advertiser: boolean
  ip_info: string
  vip_info: {
    is_vip: boolean
    vip_type: 0
    rename_days: string
    entrance_v2: null
    rename_frequency: number
    rename_await_days: number
  }
  answer_count: number
  question_count: number
  articles_count: number
  columns_count: number
  zvideo_count: number
  favorite_count: number
  pins_count: number
  voteup_count: number
  thanked_count: number
  available_medals_count: number
  uid: string
  default_notifications_count: number
  follow_notifications_count: number
  vote_thank_notifications_count: number
  messages_count: number
  creation_count: number
  is_realname: boolean
  has_applying_column: boolean
  has_add_baike_summary_permission: boolean
  editor_info: string[]
}

export type { Me }
