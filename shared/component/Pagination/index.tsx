import { useRouter } from 'next/router'

import {
  PAGINATION_BREAK_LABEL,
  PAGINATION_NEXT_LABEL,
  PAGINATION_PREV_LABEL
} from '@/shared/component/Pagination/constant'
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@/shared/constant'

import cx from 'classnames'
import ReactPaginate from 'react-paginate'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'

interface PaginationProps {
  count: number
  containerClassName?: string
  innerContainerClassName?: string
}

const Pagination = ({ count, containerClassName, innerContainerClassName }: PaginationProps) => {
  const [currentPage] = useQueryParam('page', withDefault(NumberParam, DEFAULT_PAGE))
  const [offset] = useQueryParam('limit', withDefault(NumberParam, DEFAULT_PAGE_LIMIT))
  const pageCount = Math.ceil(count / offset)
  let pages = []

  const router = useRouter()
  const { replace, query, pathname } = router

  for (let i = 0; i < count / offset; i++) {
    pages.push(i + 1)
  }

  const handlePagination = (page: { selected: number }) => {
    query.page = String(page.selected + 1)
    replace({
      pathname,
      query
    })
  }

  return (
    <div className={`${cx(containerClassName)}`}>
      <ReactPaginate
        previousLabel={PAGINATION_PREV_LABEL}
        previousLinkClassName={`paginate-navigation-button ${currentPage === 1 ? 'hidden' : 'block'}`}
        nextLabel={PAGINATION_NEXT_LABEL}
        nextLinkClassName={`paginate-navigation-button ${currentPage === pageCount ? 'hidden' : 'block'}`}
        containerClassName={`paginate-container ${innerContainerClassName}`}
        pageLinkClassName={'paginate-n-button'}
        activeLinkClassName={'paginate-n-button-active'}
        breakLabel={PAGINATION_BREAK_LABEL}
        breakLinkClassName={'paginate-break-label'}
        initialPage={currentPage - 1}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={handlePagination}
      />
    </div>
  )
}

Pagination.defaultProps = {
  containerClassName: '',
  innerContainerClassName: ''
}

export { Pagination }
