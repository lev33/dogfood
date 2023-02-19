import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';

function UserInner({ data }) {
  console.log({ data });
  const {
    about, avatar, group, name, email,
  } = data;
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={avatar} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {about}
        </p>
        <p className="card-text">
          {'группа: '}
          {group}
        </p>
        <p className="card-text">
          {'email: '}
          {email}
        </p>
      </div>
    </div>
  );
}

const UserInnerWithQuery = withQuery(UserInner);

export function UserPage() {
  const navigate = useNavigate();
  const {
    group, token,
  } = useSelector(getUserSelector);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['UserFetch'],
    queryFn: () => dogFoodApi.getUserInfo(group, token),
  });

  useEffect(() => {
    console.log('UserPage', { token });
    if (!token) navigate('/signin');
  }, [token]);

  return (token
  && (
    <UserInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
  );
}
