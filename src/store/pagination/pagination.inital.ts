import { DEFAULT_SORT, SORT_BY, SORT_METHODS, SORT_OPTIONS } from '@store/pagination/pagination.constant'

export const initialState = {
  offsetList: SORT_OPTIONS,
  sort: { methods: SORT_METHODS, sortBy: SORT_BY },
  currentSort: DEFAULT_SORT
}
