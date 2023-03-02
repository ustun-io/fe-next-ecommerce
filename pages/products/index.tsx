import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'

import { useFilterPrams } from '@/shared/hook/filter.hook'
import { usePaginationParams } from '@/shared/hook/pagination.hook'
import { useSortParams } from '@/shared/hook/sort.hook'

import { ProductGrid } from '@module/product/view/product-grid.view'
import { Container } from '@shared/component'
import { products } from '@shared/service'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  const { query } = context

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const filterArgs = useFilterPrams(query)
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const paginationArgs = usePaginationParams(query)
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const sortArgs = useSortParams(query)

  await queryClient.prefetchQuery(
    ['fetchProducts', paginationArgs, sortArgs, filterArgs],
    async () => await products(paginationArgs, sortArgs, filterArgs)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const Products: NextPage<ProductsView> = () => {
  return (
    <Container className={'font-inter'}>
      <ProductGrid />
    </Container>
  )
}

export interface ProductsView extends InferGetServerSidePropsType<typeof getServerSideProps> {}

export default Products
