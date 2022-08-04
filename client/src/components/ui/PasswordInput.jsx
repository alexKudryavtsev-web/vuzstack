import React from 'react';
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

function PasswordInput({ value, onChange, ...props }) {
  const [isShow, setIsShow] = React.useState(false);

  function handleClick() {
    setIsShow(!isShow);
  }

  return (
    <FormControl>
      <InputGroup size="md">
        <Input
          id="password"
          name="password"
          value={value}
          onChange={onChange}
          type={isShow ? 'text' : 'password'}
          {...props}
          placeholder='password'
        />
        <InputRightElement onClick={handleClick}>
          {isShow ? <RiEyeOffLine /> : <RiEyeLine />}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default PasswordInput;
