import { SortArgs } from '@/shared/model/sort-args.model'
import { SORT_DIR, SORT_OPTION, SortDir, SortOption } from '@/shared/service/product/constant/sort-options.constant'

const useSortParams = (query: any): SortArgs => {
  const { sort } = query

  return {
    sortBy: sort?.includes(SORT_OPTION.PRICE)
      ? SORT_OPTION.PRICE
      : sort?.includes(SORT_OPTION.RATING)
      ? SORT_OPTION.RATING
      : (SORT_OPTION.RATING as SortOption),
    sortDir: sort?.includes(SORT_DIR.ASC)
      ? SORT_DIR.ASC
      : sort?.includes(SORT_DIR.DESC)
      ? SORT_DIR.DESC
      : (SORT_DIR.DESC as SortDir)
  }
}
export { useSortParams }
