import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'

import { ProductGrid } from '@module/product/view/product-grid.view'
import { Container } from '@shared/component'
import { searchProducts } from '@shared/service'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  const {
    query: { page, limit, sort, q }
  } = context

  let sortMethod: 'ASC' | 'DESC' = sort?.includes('ASC') ? 'ASC' : sort?.includes('DESC') ? 'DESC' : 'DESC'
  let sortBy: 'price' | 'rating' = sort?.includes('price') ? 'price' : sort?.includes('rating') ? 'rating' : 'rating'

  const { data, error, loading } = await searchProducts(
    {
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    },
    q as string,
    { sortBy, sortDir: sortMethod }
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const ProductSearch: NextPage<ProductSearchView> = () => {
  return (
    <Container>
      <ProductGrid />
    </Container>
  )
}

interface ProductSearchView extends InferGetServerSidePropsType<typeof getServerSideProps> {}

export default ProductSearch
