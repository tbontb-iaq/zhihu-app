interface Author {
  avatar_url: string
  followers_count: number
  gender: 0 | 1
  headline: string
  id: string
  is_followed: boolean
  is_following: boolean
  is_org: boolean
  name: string
  url: string
  url_token: string
  user_type: 'people'
}

export type { Author }
