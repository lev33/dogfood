/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { getSearchSelector } from '../../../redux/slices/filterSlice';
import { Cart } from '../../Cart/Cart';

export function CartPage() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const query = useSelector(getSearchSelector);
  dogFoodApi.setToken(token);

  useEffect(() => {
    console.log('CartPage', { token });
    if (!token) navigate('/signin');
  }, [token, query]);

  return (token
  && (
  <Cart />
  )
  );
}
