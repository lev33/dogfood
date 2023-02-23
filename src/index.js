import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { Main } from './components/Main/Main';
import { CartPage } from './components/Pages/CartPage/CartPage';
import { ProductsPage } from './components/Pages/ProductsPage/ProductsPage';
import { AuthenticationPage } from './components/Pages/AuthenticationPage/AuthenticationPage';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';
import { store } from './redux/store';
import { UserPage } from './components/Pages/UserPage/UserPage';
import { ProductPage } from './components/Pages/ProductPage/ProductPage';

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'signin',
        element: <AuthenticationPage />,
      },
      {
        path: 'signup',
        element: <RegistrationPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={myRouter} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
