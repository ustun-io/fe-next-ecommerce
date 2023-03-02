import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ProductSingle } from '@module/product/view/single-product.view'
import { Container } from '@shared/component'
import { product } from '@shared/service'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string
  const { data, loading, error } = await product(id)
  return { props: { product: data, loading: false, error: error || null }, revalidate: 45 }
}

const Product = ({ product, loading, error }: SingleProductView) => {
  return (
    <Container className={'font-inter'}>
      <ProductSingle product={product.product} loading={loading} error={error} />
    </Container>
  )
}

export interface SingleProductView extends InferGetStaticPropsType<typeof getStaticProps> {}

export default Product
