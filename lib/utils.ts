type ConvertUndefined<T> = OrUndefined<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrUndefined<T> = {[K in keyof T]: T[K] | undefined}
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

export const pick = <Keys extends keyof Obj, Obj>(
  keys: Keys[],
  obj: Obj
): ConvertPick<{[K in Keys]: Obj[K]}> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as any)
}

export function round(value: number) {
  return value.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
}
