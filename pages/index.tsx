import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@/shared/constant'
import { SORT_DIR, SORT_OPTION } from '@/shared/service/product/constant/sort-options.constant'

export default function Home() {
  const { query, replace } = useRouter()

  useEffect(() => {
    query.page = query.page ? query.page : String(DEFAULT_PAGE)
    query.limit = query.limit ? query.limit : String(DEFAULT_PAGE_LIMIT)
    query.sort = query.sort ? query.sort : encodeURIComponent(`${SORT_DIR.DESC},${SORT_OPTION.PRICE}`)

    replace({
      pathname: '/products',
      query
    })
  })
  return null
}
