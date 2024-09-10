import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { MOCKED_TICKETS } from './mocks/tickets';
import { MOCKED_USERS } from './mocks/users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([{ path: '*', Component: Routes }]);

function App() {
  const { tickets, setTickets, setUsers } = useAppStore((state) => ({
    tickets: state.tickets,
    setTickets: state.setTickets,
    setUsers: state.setUsers,
  }));

  useEffect(() => {
    // When App loads for the first time, load "mocked" tickets and users and cache them in Local Storage.

    if (tickets.length === 0) {
      setTickets(MOCKED_TICKETS);
      setUsers(MOCKED_USERS);
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
