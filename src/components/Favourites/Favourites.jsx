/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getFavouritesSelector } from '../../redux/slices/favouritesSlice';
import { getUserSelector } from '../../redux/slices/userSlice';
import { FavouritesItem } from '../FavouritesItem/FavouritesItem';
import { withQuery } from '../HOCs/withQuery';

function FavouritesInner({ data }) {
  console.log('FavouritesData', { data });
  const products = data;
  if (!products.length) {
    return (
      <>
        <h1>Список пуст...</h1>
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
        <Link to="/user">
          <button type="button" className="btn btn-primary">
            Профиль
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
            <FavouritesItem
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
      </div>
    </div>
  );
}

const FavouritesInnerWithQuery = withQuery(FavouritesInner);

export function Favourites() {
  const favourites = useSelector(getFavouritesSelector);
  console.log({ favourites });
  const { token } = useSelector(getUserSelector);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['FavouritesFetch', favourites],
    queryFn: () => dogFoodApi.getProductsByIds(favourites, token),
    keepPreviousData: true,
  });

  if (data) {
    const idsFromServer = data.map((el) => el._id);
    console.log({ idsFromServer });
  }

  // console.log({ data });
  const filteredData = data && data.filter((el) => favourites.includes(el._id));
  console.log({ filteredData });

  const isIdError = data && favourites.length !== filteredData.length;
  const idError = isIdError ? { message: 'idError' } : null;
  console.log({
    isError, error, isIdError, idError,
  });

  return (
    <FavouritesInnerWithQuery
      data={filteredData}
      isLoading={isLoading}
      // isError={isError || isIdError}
      // error={error || idError}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
