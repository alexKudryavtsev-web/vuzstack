import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Header from './components/header/Header';
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
        <ChakraProvider>
          <Header/>
          <AppRoutes />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
