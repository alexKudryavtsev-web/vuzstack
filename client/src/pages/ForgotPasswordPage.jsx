import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';
import AuthService from '../services/AuthService';
import parseErrorMessageToText from '../utils/parseErrorObjectToText';

function LoginPage() {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    async onSubmit(data) {
      try {
        const res = await AuthService.resetPassword(data.email);

        setMessage(res.request.statusText);
      } catch (error) {
        setMessage(parseErrorMessageToText(error.response.data.message));
      }
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
            <Button type="submit" colorScheme="teal" width="full">
              reset password
            </Button>
          </VStack>
          <Center width="full">
            <Text>{message}</Text>
          </Center>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default LoginPage;
