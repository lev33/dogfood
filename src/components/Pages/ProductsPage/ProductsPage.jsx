/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../../contexts/TokenContextProvider';
import { Products } from '../../Products/Products';

export function ProductsPage() {
  const navigate = useNavigate();
  const token = useTokenContext();

  useEffect(() => {
    console.log('ProductsPage', { token });
    if (!token) navigate('/signin');
  }, [token]);
  return (token
  && (
  <Products
    token={token}
  />
  )
  );
}
