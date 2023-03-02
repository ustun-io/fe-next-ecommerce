// TODO: remove comments
import { useRouter } from 'next/router'

import { useFilterPrams } from '@/shared/hook/filter.hook'
import { usePaginationParams } from '@/shared/hook/pagination.hook'
import { useSortParams } from '@/shared/hook/sort.hook'
import { Product } from '@/shared/model'

import { Card } from '@module/product/component/Card/card.component'
import { PageHeading } from '@module/product/component/PageHeading'
import { Sidebar } from '@module/product/component/Sidebar'
import { Loader, Pagination } from '@shared/component'
import { products } from '@shared/service'
import { useQuery } from '@tanstack/react-query'

const ProductGrid = () => {
  const router = useRouter()
  const { query } = router

  const filterArgs = useFilterPrams(query)
  const paginationArgs = usePaginationParams(query)
  const sortArgs = useSortParams(query)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fetchProducts', paginationArgs, sortArgs, filterArgs],
    queryFn: () => products,
    staleTime: Infinity,
    refetchOnWindowFocus: true
  })

  if (isLoading) {
    return <Loader loading={isLoading} />
  }

  if (isError) {
    // @ts-ignore
    return <span>Error: {error.message}</span>
  }

  if (!isLoading) {
    return (
      <div className="flex flex-col mx-auto md:w-11/12 3xl:w-full">
        <div className={'flex mx-auto md:mx-0'}>
          <Sidebar className={'w-[14rem] max-w-[14rem] hidden md:block md:mt-4'} />
          <div className={'flex-grow flex flex-col md:ml-5'}>
            <div className={`md:mt-4 flex flex-col`}>
              {/*@ts-ignore*/}
              <PageHeading count={data.count} />
              <div
                className={
                  'grid grid-cols-1 self-start gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5 '
                }
              >
                {
                  /*@ts-ignore*/
                  data?.data && data?.data?.map((product: Product, i: number) => <Card key={i} product={product} />)
                }
              </div>
              {/*@ts-ignore*/}
              <Pagination count={data.count} containerClassName={'self-end mb-2 col-span-full ml-auto'} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export { ProductGrid }
