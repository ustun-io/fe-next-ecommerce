import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@/shared/constant'

const usePaginationParams = (query: any) => {
  const { page, limit } = query
  return {
    page: page ? parseInt(page as string) : DEFAULT_PAGE,
    limit: limit ? parseInt(limit as string) : DEFAULT_PAGE_LIMIT
  }
}

export { usePaginationParams }
