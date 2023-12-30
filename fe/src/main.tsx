import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { CreteCategories } from './components/pages/Categories/CreateCategories';
import { ListProducts } from './components/pages/Products/listProduct';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { Orders } from './components/Orders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/categories',
        element: <CreteCategories />,
      },
      {
        path: '/',
        element: <Orders />,
      },
      {
        path: '/products',
        element: <ListProducts />,
      },
      {
        path: '/ingredients',
        element: <ListProducts />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
