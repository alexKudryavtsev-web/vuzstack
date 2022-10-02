import React from 'react';
import { useState } from 'react';
import Search from './Search';
import SearchForm from './SearchForm';
import Selected from './Selected';

function UploadDirections() {
  const [text, setText] = useState('');

  return (
    <>
      <SearchForm text={text} setText={setText} />
      {text ? <Search text={text} /> : <Selected />}
    </>
  );
}

export default UploadDirections;
