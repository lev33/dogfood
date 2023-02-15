/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { CartItem } from '../CartItem/CartItem';
import { CartResult } from '../CartResult/CartResult';
import { withQuery } from '../HOCs/withQuery';

function CartInner({ data }) {
  console.log('CartData', { data });
  const products = data;
  if (!products.length) {
    return (
      <>
        <h1>Корзина пуста...</h1>
        <Link to="/cart">
          <button type="button" className="btn btn-primary">
            Корзина
          </button>
        </Link>
        <Link to="/products">
          <button type="button" className="btn btn-primary">
            Продукты
          </button>
        </Link>
        <Link to="/cart">
          <button type="button" className="btn btn-primary">
            Профиль?
          </button>
        </Link>
      </>
    );
  }

  return (
    <div className="d-flex flex-row justify-content-between">
      <div>
        <ul
          className="d-flex flex-column p-2"
        >
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
      </div>
      <div>
        <CartResult data={data} />
      </div>
    </div>
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
