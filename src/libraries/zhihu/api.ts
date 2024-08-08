import { Answer, Recommend } from './types'
import { DeepKeyof, Equals, If, Path } from '@/utils/types'

import { array, never, object, string, ZodObject, ZodType } from 'zod'

const BASE_URL = 'https://api.zhihu.com/',
  Api = {
    recommend: defineApi('topstory/recommend', { data: <Recommend>{} }),

    answer: defineApi('answers/%(id)s', {
      data: <Answer>{},
      param: object({ id: string() }),
      query: object({
        include: array(
          string() as ZodType<Path<Answer> | DeepKeyof<Answer>>
        ).transform(s => s.join(',')),
      }),
    }),
  }

// URLSearchParams
type Query =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined

type RealPartial<T> =
  T extends Record<string, unknown>
    ? If<Equals<T, Record<string, unknown>>, T, Partial<T>>
    : T

/**
 * Infer Types for Generic Type Parameters That Are Not Specified
 * https://github.com/microsoft/TypeScript/issues/43119
 *
 * Implement partial type argument inference using the _ sigil
 * https://github.com/microsoft/TypeScript/pull/26349
 *
 * 当第一个泛型参数被传入时，其余的泛型参数无法自动推断
 */
/** */
function defineApi<
  Path extends string,
  Data,
  POutput,
  QOutput extends Query = undefined,
  PInput = never,
  QInput = never,
>(
  path: Path,
  {
    data,
    param = never(),
    query = never(),
  }: {
    data: Data
    param?: ZodType<POutput, any, PInput>
    query?: ZodType<QOutput, any, QInput>
  }
) {
  return {
    data,
    path,
    param,
    query: <ZodType<RealPartial<QOutput>, any, RealPartial<QInput>>>(
      (<unknown>(query instanceof ZodObject ? query.partial() : query))
    ),
  }
}

export { BASE_URL, Api, type Query }
