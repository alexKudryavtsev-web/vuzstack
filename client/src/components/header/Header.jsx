import React from 'react';
import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import { getIsAuth } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { store } from "../../store"
import { logout } from '../../store/reducers/userReducer';

function Header({ ...props }) {
  const isAuth = useSelector(getIsAuth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  function menuToggleHandle() {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }

  async function logoutBtnHandler() {
    try {
      store.dispatch(logout())
      navigate('/');
    } catch (e) {}
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      bg="teal.500"
      color="white"
      onClick={() => onClose()}
      {...props}
    >
      <Flex as={Link} to="/" align="center" mr={5}>
        <Logo />
      </Flex>

      <Box
        display={{ base: 'block', md: 'none' }}
        onClick={(e) => {
          e.stopPropagation();
          menuToggleHandle();
        }}
      >
        <GiHamburgerMenu />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Box>
          <Text as={Link} to="/example">
            example
          </Text>
        </Box>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        alignItems="center"
        justify="flex-end"
        flexGrow={1}
      >
        {isAuth ? (
          <>
            <Box>
              <Button
                as={Link}
                to="/"
                variant="outline"
                _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
              >
                profile
              </Button>
            </Box>
            <Box>
              <Button
                variant="outline"
                _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
                onClick={logoutBtnHandler}
              >
                log out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Button
                as={Link}
                to="/"
                variant="outline"
                _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
              >
                log in
              </Button>
            </Box>
            <Box>
              <Button
                as={Link}
                to="create-account"
                variant="outline"
                _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
              >
                create account
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
