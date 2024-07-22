import { request } from './request'
import { BASE_URL, Query } from './api'

import { sprintf } from 'sprintf-js'
import { ZodNever, ZodType } from 'zod'
import { Equals, If } from '@/utils/types'

async function get<Data, POutput, QOutput extends Query, PInput, QInput>(
  api: {
    data: Data
    path: string
    param: ZodType<POutput, any, PInput>
    query: ZodType<QOutput, any, QInput>
  },
  ...args: [
    ...If<Equals<PInput, never>, [], [param: PInput]>,
    ...If<Equals<QInput, never>, [], [query?: QInput]>,
    init?: RequestInit,
  ]
): Promise<Awaited<Data>> {
  const param =
      api.param instanceof ZodNever
        ? <POutput>{}
        : await api.param.parseAsync(args.shift()),
    query =
      api.query instanceof ZodNever
        ? <QOutput>{}
        : await api.query.parseAsync(args.shift()),
    init = <RequestInit>args[0] ?? {},
    search = new URLSearchParams(query),
    search_str = search.size ? `?${search}` : '',
    path = sprintf(api.path, param),
    url = `${BASE_URL}${path}${search_str}`

  return await request(url, init)
}

export { get }
