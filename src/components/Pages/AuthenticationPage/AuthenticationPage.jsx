import { useEffect } from 'react';
import { useTokenContext, useTokenMethodsContext } from '../../../contexts/TokenContextProvider';
import { Authentication } from '../../Authentication/Authentication';

export function AuthenticationPage() {
  const token = useTokenContext();
  const { clearLS } = useTokenMethodsContext();

  useEffect(() => {
    console.log('AuthenticationPage', { token });
    if (token) clearLS();
  }, []);

  return (
    <Authentication />
  );
}
