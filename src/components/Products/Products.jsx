import { useQuery } from '@tanstack/react-query';
import { dogFoodApi } from '../../api/DogFoodApi';
import { withQuery } from '../HOCs/withQuery';
import { ProductItem } from '../ProductItem/ProductItem';
import { Search } from '../Search/Search';

function ProductsInner({ query, data }) {
  console.log({ data });
  const products = query ? data : data.products;
  if (!products.length) return <h1>Ничего не найдено...</h1>;

  return (
    <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
      {products.map(({ _id: id, ...product }) => (
        <ProductItem
          key={id}
          id={id}
          name={product.name}
          pictures={product.pictures}
          description={product.description}
        />
      ))}
    </ul>
  );
}

const ProductsInnerWithQuery = withQuery(ProductsInner);

export function Products({ query }) {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductsFetch', query],
    queryFn: () => (query ? dogFoodApi.getQueryProducts(query) : dogFoodApi.getAllProducts()),
  });

  return (
    <>
      <Search />
      <ProductsInnerWithQuery
        query={query}
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </>
  );
}
