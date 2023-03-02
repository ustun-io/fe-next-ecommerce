import Link from 'next/link'

import { SingleProductView } from '@/pages/products/[id]'

import { ProductRating } from '@module/product/component/Rating/rating.component'
import { SpecList } from '@module/product/component/Specification/specification.component'
import { Summary } from '@module/product/component/Summary/summary.component'
import { Loader, Wrapper } from '@shared/component'
import { FormattedMessage } from 'react-intl'

const ProductSingle = ({ product, loading }: SingleProductView) => {
  return (
    <div className={'pb-10'}>
      <Loader loading={loading} />
      <h5 className={'text-blue-300 mb-4 cursor-auto'}>
        <Link href={'/products'} className={'capitalize hover:underline underline-offset-4'}>
          <FormattedMessage id={'navigation_products'} />
        </Link>
        <span> &gt; </span>
        <Link
          href={`/products/categories/${product.category.id}`}
          className={'capitalize hover:underline underline-offset-4'}
        >
          {product.category.name}
        </Link>
        <span> &gt; </span>
        <Link href={`/products/brands/${product.brand.id}`} className={'capitalize hover:underline underline-offset-4'}>
          {product.brand.name}
        </Link>
        <span> &gt; </span>
        <b>{product.name}</b>
      </h5>
      <Summary product={product} />
      <Wrapper
        /* Description */
        title={<FormattedMessage id={'product_description'} />}
        description={
          <>
            {product.description as string} <FormattedMessage id={'product_warranty'} />.
          </>
        }
      />
      <Wrapper
        /* Specifications */ title={<FormattedMessage id={'product_specs'} />}
        description={<SpecList product={product} />}
      />
      <ProductRating productId={product.id} rating={product.rating} />
    </div>
  )
}

ProductSingle.defaultProps = {
  product: {}
}

export { ProductSingle }
