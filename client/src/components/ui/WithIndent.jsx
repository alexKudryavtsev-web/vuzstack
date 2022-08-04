import React from 'react';
import { Box } from '@chakra-ui/react';

function WithIndent({ children, ...props }) {
  return (
    <Box maxWidth="800px" paddingTop={1} margin="auto" {...props}>
      {children}
    </Box>
  );
}

export default WithIndent;
