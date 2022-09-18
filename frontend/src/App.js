import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes';
import { store } from './store';
import { getIsAuth, getIsLoading } from './store/selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/reducers/userReducer';
import Loader from './components/loader/Loader';
import { readSettings } from './store/reducers/settingsReducer';

function AppRoutes() {
  const isAuth = useSelector(getIsAuth);

  return useRoutes(isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES);
}

function App() {
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {

    store.dispatch(readSettings())

    if (localStorage.getItem('token')) {
      store.dispatch(checkAuth());
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar transparent />
      <AppRoutes />
    </>
  );
}

export default App;
