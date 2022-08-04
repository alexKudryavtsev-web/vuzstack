import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  Input,
  Link,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';
import PasswordInput from '../components/ui/PasswordInput';
import AuthService from '../services/AuthService';
import { useState } from 'react';

import parseErrorMessageToText from '../utils/parseErrorObjectToText';

function CreateAccountPage() {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      agree: false,
      gender: 'other',
    },
    async onSubmit(data) {
      try {
        const res = await AuthService.registration(
          data.email,
          data.firstName,
          data.lastName,
          data.password,
          data.gender,
          data.agree,
        );

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
            <FormControl>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="first name"
              />
            </FormControl>
            <FormControl>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="last name"
              />
            </FormControl>
            <PasswordInput
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormControl>
              <Select
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                placeholder="gender"
              >
                <option value="male">male</option>
                <option value="women">women</option>
                <option value="other">other</option>
              </Select>
            </FormControl>
            <Checkbox
              id="agree"
              name="agree"
              onChange={formik.handleChange}
              isChecked={formik.values.agree}
              colorScheme="teal"
            >
              I agree to the{' '}
              <Link
                target="_blank"
                href="http://localhost:3000/static/agreement.pdf"
                color="blue.400"
              >
                terms
              </Link>{' '}
              of use
            </Checkbox>
            <Button type="submit" colorScheme="teal" width="full">
              create account
            </Button>
            <Center width="full">
              <Text>{message}</Text>
            </Center>
          </VStack>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default CreateAccountPage;
