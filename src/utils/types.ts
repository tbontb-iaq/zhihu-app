type Equals<A, B> =
  (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B ? 1 : 0
    ? true
    : false

type If<C extends boolean, True, False> = C extends true ? True : False

export type { Equals, If }
