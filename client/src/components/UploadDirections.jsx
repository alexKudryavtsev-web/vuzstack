import React from 'react';
import DirectionsList from './directions/DirectionsList';
import { store } from '../store';
import { uploadDirections } from '../store/reducers/userReducer';
import SearchDirections from './directions/SearchDirections';

function UploadDirections() {
  return (
    <div>
      <SearchDirections />
      <DirectionsList />
      <div className="flex justify-end mt-2">
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={() => store.dispatch(uploadDirections())}
        >
          Всё готово! Хочу поступать
        </button>
      </div>
    </div>
  );
}

export default UploadDirections;
