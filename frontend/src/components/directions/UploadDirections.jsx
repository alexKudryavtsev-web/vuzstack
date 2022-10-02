import React from 'react';
import { useState } from 'react';
import Search from './Search';
import Selected from './Selected';

function UploadDirections() {
  const [showSelected, setShowSelected] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowSelected(!showSelected)}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {showSelected ? 'выбрать еще' : 'к выбранным'}
        </button>
      </div>
      {showSelected ? <Selected /> : <Search />}
    </>
  );
}

export default UploadDirections;
