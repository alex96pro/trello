import { useRoutes } from 'react-router-dom';
import Board from '../pages/Board/Board';

const Routes = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Board />,
      errorElement: null,
    },
    {
      path: '*',
      element: <div>Page not found</div>,
    },
  ]);

  return elements;
};

export default Routes;
