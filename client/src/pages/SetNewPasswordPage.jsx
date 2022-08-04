import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';
import PasswordInput from '../components/ui/PasswordInput';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import parseErrorMessageToText from '../utils/parseErrorObjectToText';
import { useParams } from 'react-router-dom';

function LoginPage() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    async onSubmit(data) {
      try {
        const res = await AuthService.setNewPassword(data.password, token);

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
            <PasswordInput
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button type="submit" colorScheme="teal" width="full">
              set new password
            </Button>
          </VStack>
          <Center>
            <Text>{message}</Text>
          </Center>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default LoginPage;
