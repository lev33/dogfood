import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
import { FILTER_QUERY_NAME, getFilteredProducts } from '../Filters/constants';
import { Filters } from '../Filters/Filters';
import { withQuery } from '../HOCs/withQuery';
import { ProductItem } from '../ProductItem/ProductItem';
import { Search } from '../Search/Search';

function ProductsInner({ data }) {
  console.log({ data });
  const products = data;

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
          price={product.price}
          wight={product.wight}
          discount={product.discount}
          stock={product.stock}
        />
      ))}
    </ul>
  );
}

const ProductsInnerWithQuery = withQuery(ProductsInner);

export function Products({ query }) {
  const { token } = useSelector(getUserSelector);

  const [searchParams] = useSearchParams();
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductsFetch', query],
    queryFn: () => dogFoodApi.getQueryProducts(query, token),
    keepPreviousData: true,
  });

  let products = data;

  if (currentFilterNameFromQuery) {
    products = getFilteredProducts(data, currentFilterNameFromQuery);
  }

  return (
    <>
      <Search />
      <Filters />
      <ProductsInnerWithQuery
        data={products}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </>
  );
}
