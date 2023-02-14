import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSearchSelector } from '../../../redux/slices/filterSlice';
import { Products } from '../../Products/Products';

export function ProductsPage() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const query = useSelector(getSearchSelector);

  useEffect(() => {
    console.log('ProductsPage', { token });
    if (!token) navigate('/signin');
  }, [token, query]);

  return (token
  && (
  <Products query={query} />
  )
  );
}
