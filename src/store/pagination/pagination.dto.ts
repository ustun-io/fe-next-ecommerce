export interface IPaginationStore {
  offsetList: number[]
  sort: { methods: any[]; sortBy: any[] }
  currentSort: string
  setSort: (sort: string) => void
}
