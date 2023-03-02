import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'

import { ProductGrid } from '@module/product/view/product-grid.view'
import { Container } from '@shared/component'
import { searchProducts } from '@shared/service'

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    { sortBy, sort: sortMethod }
  )

  return { props: { data: data.searchProducts, loading, error: error || null, count: data.searchProducts.count } }
}

const ProductSearch: NextPage<ProductSearchView> = ({ data, loading, error, count }) => {
  return (
    <Container>
      <ProductGrid data={data} loading={loading} error={error} count={count} />
    </Container>
  )
}

interface ProductSearchView extends InferGetServerSidePropsType<typeof getServerSideProps> {}

export default ProductSearch
