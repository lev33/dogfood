/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { dogFoodApi } from '../../api/DogFoodApi';
import { withQuery } from '../HOCs/withQuery';
import { ProductItem } from '../ProductItem/ProductItem';

function ProductsInner({ data }) {
  const { products } = data;
  if (!products.length) return <p>is empty...</p>;

  return (
    <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          name={product.name}
          pictures={product.pictures}
          description={product.description}
        />
      ))}
    </ul>
  );
}

const ProductsInnerWithQuery = withQuery(ProductsInner);

export function Products() {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductsFetch'],
    queryFn: () => dogFoodApi.getAllProducts(),
  });

  return (
    <ProductsInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
