import { createContext, useContext, useMemo } from 'react';
import { useToken } from './useToken';

export const TokenContext = createContext();
export const TokenMethodsContext = createContext();

export function TokenContextWrapper({ children }) {
  const { token, ...methods } = useToken();
  const TokenMethods = useMemo(() => methods, [token]);

  return (
    <TokenContext.Provider value={token}>
      <TokenMethodsContext.Provider value={TokenMethods}>
        {children}
      </TokenMethodsContext.Provider>
    </TokenContext.Provider>
  );
}

export const useTokenContext = () => useContext(TokenContext);
export const useTokenMethodsContext = () => useContext(TokenMethodsContext);
