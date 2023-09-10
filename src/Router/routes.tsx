/* eslint-disable import/prefer-default-export */
import { createHashRouter } from 'react-router-dom';
import { ArrayRoutes } from './routeObject';
import App from '../App';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...ArrayRoutes.map((item) => ({
        path: item.path,
        element: item.element,
        //   loader: rootLoader,
        children: item.children,
      })),
    ],
  },
]);
