import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import WithIndent from '../components/ui/WithIndent';
import { useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import defaultAvatar from '../static/404Image.jpg';

function ProfilePage() {
  const user = useSelector(getUser);

  return (
    <WithIndent padding="2em">
      <Flex>
        <VStack>
          <Box>
            <Heading size="lg">
              {user.firstName} {user.lastName}
            </Heading>
          </Box>
          <Box>
            <Heading size="md">{user.gender}</Heading>
          </Box>
          <Box>
            <Heading size="md">
              {new Date(user.createdAt).toLocaleDateString()}
            </Heading>
          </Box>
        </VStack>
        <Center flex={1}>
          <Image src={defaultAvatar} boxSize="250px" borderRadius="full" />
        </Center>
      </Flex>
    </WithIndent>
  );
}

export default ProfilePage;
