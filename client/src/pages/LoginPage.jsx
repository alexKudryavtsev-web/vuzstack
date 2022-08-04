import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';
import PasswordInput from '../components/ui/PasswordInput';
import { Link as NavLink } from 'react-router-dom';
import { store } from '../store';
import { login } from '../store/reducers/userReducer';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(data) {
      store.dispatch(login({ ...data }));
    },
  });

  return (
    <CenterOnPage>
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="email"
              />
            </FormControl>
            <PasswordInput
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button type="submit" colorScheme="teal" width="full">
              login
            </Button>
            <Center width="full">
              <Link
                as={NavLink}
                to="/forgot-password"
                color="blue.300"
                textAlign="center"
              >
                forgot passsword?
              </Link>
            </Center>
          </VStack>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default LoginPage;
