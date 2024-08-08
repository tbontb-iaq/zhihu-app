type Equals<A, B> =
  (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B ? 1 : 0
    ? true
    : false

type If<C extends boolean, True, False> = C extends true ? True : False

type Path<T> = T extends unknown[]
  ? never
  : T extends object
    ? {
        [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Path<T[K]>}`}`
      }[keyof T]
    : never

type DeepKeyof<T> = T extends unknown[]
  ? never
  : T extends object
    ? keyof T | DeepKeyof<T[keyof T]>
    : never

type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never

type LastOfUnion<T> =
  UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R
    ? R
    : never

type UnionToTuple<T, L = LastOfUnion<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L]

export type { Equals, If, Path, DeepKeyof, UnionToTuple, LastOfUnion }
