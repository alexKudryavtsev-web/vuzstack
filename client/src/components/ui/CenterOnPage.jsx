import React from 'react';
import { Center } from '@chakra-ui/react';

function CenterOnPage({ children }) {
  return (
    <Center
      position="absolute"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={-100}
    >
      {children}
    </Center>
  );
}

export default CenterOnPage;
