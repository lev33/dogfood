import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { AddProductModal } from './AddProductModal';

function UserInner({ data }) {
  console.log({ data });
  const {
    about, avatar, group, name, email,
  } = data;

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeAddProductModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openAddProductModalHandler = () => {
    setIsShowDeleteModal(true);
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
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
              <button
                onClick={openAddProductModalHandler}
                type="button"
                className="btn btn-primary"
              >
                Добавить товар
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddProductModal
        closeHandler={closeAddProductModalHandler}
        isOpen={isShowDeleteModal}
        name={name}
      />
    </>
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
