import React from 'react';
import CreateMarkModal from './CreateMarkModal';
import { store } from '../store';
import { uploadMarks } from '../store/reducers/userReducer';
import MarksList from './marks/MarksList';

function UploadMarks() {
  return (
    <>
      <MarksList />
      <div className="flex justify-end mt-2">
        <CreateMarkModal />
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={() => store.dispatch(uploadMarks())}
        >
          к направлениям
        </button>
      </div>
    </>
  );
}

export default UploadMarks;
