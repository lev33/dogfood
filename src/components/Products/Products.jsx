/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { withQuery } from '../HOCs/withQuery';
import { ProductItem } from '../ProductItem/ProductItem';

function ProductsInner({ data }) {
  const { products } = data;
  if (!products.length) return <p>is empty...</p>;

  return (
    <ul className="list-group">
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

export function Products({ token }) {
  console.log('Products', { token });
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductsFetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при получении списка товаров. 
        Проверьте отправляемые данные. Status: ${res.status}`);
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении списка товаров. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
      }
      return res.json();
    }),
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
