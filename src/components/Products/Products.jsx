import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
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
  const { token } = useSelector(getUserSelector);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductsFetch', query],
    queryFn: () => (query ? dogFoodApi.getQueryProducts(query, token)
      : dogFoodApi.getAllProducts(token)),
    keepPreviousData: true,
  });

  return (
    <>
      <Search />
      <ProductsInnerWithQuery
        query={query}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </>
  );
}
