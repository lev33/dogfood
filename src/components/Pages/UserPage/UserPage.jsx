import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function UserPage() {
  const navigate = useNavigate();
  const {
    email, group, name, token,
  } = useSelector((state) => state.user);

  useEffect(() => {
    console.log('UserPage', { token });
    if (!token) navigate('/signin');
  }, [token]);

  return (token
  && (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {group}
        </p>
        <p className="card-text">
          {email}
        </p>
      </div>
    </div>
  )
  );
}
