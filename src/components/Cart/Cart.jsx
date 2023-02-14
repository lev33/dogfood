import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { CartItem } from '../CartItem/CartItem';
import { CartResult } from '../CartResult/CartResult';
import { withQuery } from '../HOCs/withQuery';

function CartInner({ data }) {
  console.log('CartData', { data });
  const products = data;
  if (!products.length) return <h1>Корзина пуста...</h1>;

  return (
    <>
      <CartResult data={data} />
      <ul className="p-2 align-items-center justify-content-around">
        {products.map(({ _id: id, ...product }) => (
          <CartItem
            key={id}
            id={id}
            name={product.name}
            pictures={product.pictures}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </ul>
    </>
  );
}

const CartInnerWithQuery = withQuery(CartInner);

export function Cart() {
  const cart = useSelector((store) => store.cart);
  const { token } = useSelector((state) => state.user);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['CartFetch', cart.length],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((el) => el.id), token),
  });

  useEffect(() => {}, [cart.length]);

  return (
    <CartInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
