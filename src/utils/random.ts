// [0, 1) float
function num(): number
// [0, max)
function num(max: number, float?: boolean): number
// [min, max)
function num(min: number, max: number, float?: boolean): number

function num(arg1?: number, arg2?: number | boolean, arg3?: boolean) {
  switch (undefined) {
    case arg1:
      return Math.random()
    case arg2:
      return num(0, arg1!)
    case arg3:
      return typeof arg2 === 'number'
        ? num(arg1!, arg2, false)
        : num(0, arg1!, arg2)
    default: {
      if (typeof arg2 !== 'number') break
      const v = num() * (arg2 - arg1!) + arg1!
      return arg3 ? v : Math.floor(v)
    }
  }
  throw TypeError(`Invalid argument: ${arg1} ${arg2} ${arg3}`)
}

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function char(chars = defaultChars) {
  return chars.charAt(num(chars.length))
}

function str(length = 8, chars?: string): string {
  return Array.from({ length }, () => char(chars)).join('')
}

function bool() {
  // [0, 0.5) [0.5, 1)
  return num() < 0.5
}

function arr<T>(a: T[]): T
function arr<T = number>(length: number, generate?: (index: number) => T): T[]

function arr<T>(
  arg1: T[] | number,
  arg2: (index: number) => T = () => <T>num()
) {
  if (typeof arg1 === 'number')
    return Array.from({ length: arg1 }, (_, k) => arg2(k))
  else return arg1[num(arg1.length)]
}

function key(map: Map<string, unknown>) {
  let key
  do key = str()
  while (map.has(key))
  return key
}

export default { num, char, str, bool, arr, key }
