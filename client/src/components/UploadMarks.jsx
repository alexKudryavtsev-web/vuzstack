import React from 'react';
import CreateMarkModal from './CreateMarkModal';
import { useSelector } from 'react-redux';
import { getMarks } from '../store/selectors';
import translateExamName from '../utils/translateExamName';
import getIconForExam from '../utils/getIconForExam';
import { store } from '../store';
import { uploadMarks } from '../store/reducers/userReducer';

function UploadMarks() {
  const marks = useSelector(getMarks);

  return (
    <>
      <div className="divide-y divide-slate-100">
        <ul className="divide-y divide-slate-100">
          {marks.map((mark) => (
            <div className="flex" key={mark.id}>
              <div className="flex-none w-14 h-14 flex justify-center items-center font-bold">
                {getIconForExam(mark.exam)}
              </div>
              <div className="flex-none flex items-center">
                {translateExamName(mark.exam)}
              </div>
              <div className="flex-1 flex justify-end items-center">
                <div className="px-1.5 ring-1 ring-slate-200 rounded">
                  {mark.result}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
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
