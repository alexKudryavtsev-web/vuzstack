import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes';
import { store } from './store';
import { getIsAuth } from './store/selectors';
import { useSelector } from 'react-redux';

function AppRoutes() {
  const isAuth = useSelector(getIsAuth);

  return useRoutes(isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES);
}

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar transparent isAuth />
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
