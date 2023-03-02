import { FILTER } from '@module/product/component/Sidebar/constant'

const useFilterPrams = (query: any) => {
  const brand = query[FILTER.BRAND]
    ? Array.isArray(query[FILTER.BRAND])
      ? (query[FILTER.BRAND] as string[])
      : ([query[FILTER.BRAND]] as string[])
    : undefined

  const category = query[FILTER.CATEGORY]
    ? Array.isArray(query[FILTER.CATEGORY])
      ? (query[FILTER.CATEGORY] as string[])
      : ([query[FILTER.CATEGORY]] as string[])
    : undefined

  const ram = query[FILTER.RAM]
    ? Array.isArray(query[FILTER.RAM])
      ? (query[FILTER.RAM] as string[]).map((value: string) => parseInt(value))
      : [parseInt(query[FILTER.RAM] as string)]
    : undefined

  const storage = query[FILTER.STORAGE]
    ? Array.isArray(query[FILTER.STORAGE])
      ? (query[FILTER.STORAGE] as string[]).map((value: string) => parseInt(value))
      : [parseInt(query[FILTER.STORAGE] as string)]
    : undefined

  const priceMin = query[FILTER.PRICE_MIN] ? parseFloat(query[FILTER.PRICE_MIN] as string) : undefined

  const priceMax = query[FILTER.PRICE_MAX] ? parseFloat(query[FILTER.PRICE_MAX] as string) : undefined

  return {
    ...(brand && { brand }),
    ...(category && { category }),
    ...(ram && { ram }),
    ...(storage && { storage }),
    ...(priceMin && { priceMin }),
    ...(priceMax && { priceMax })
  }
}
export { useFilterPrams }
