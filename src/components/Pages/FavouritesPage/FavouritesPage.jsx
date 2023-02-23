import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { Favourites } from '../../Favourites/Favourites';

export function FavouritesPage() {
  const navigate = useNavigate();
  const { token } = useSelector(getUserSelector);

  useEffect(() => {
    console.log('FavouritesPage', { token });
    if (!token) navigate('/signin');
  }, [token]);

  return (token
  && (
  <Favourites />
  )
  );
}
