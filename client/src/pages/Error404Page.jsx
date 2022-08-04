import { Box, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';

import CenterOnPage from '../components/ui/CenterOnPage.jsx';
import image from '../static/404Image.jpg';

function Error404Page() {
  return (
    <CenterOnPage>
      <VStack>
        <Box>
          <Image src={image} height={300} />
        </Box>
        <Box>
          <Heading size="lg">Oops, something went wrong!</Heading>
        </Box>
      </VStack>
    </CenterOnPage>
  );
}

export default Error404Page;
