import React from 'react';
import { TbMathSymbols } from 'react-icons/tb';
import { GiPencil } from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import CreateMarkModal from './CreateMarkModal';

function UploadMarks() {
  return (
    <>
      <div className="divide-y divide-slate-100">
        <ul className="divide-y divide-slate-100">
          <div className="flex">
            <div className="flex-none w-14 h-14 flex justify-center items-center font-bold">
              <TbMathSymbols size={42} />
            </div>
            <div className="flex-none flex items-center">математика</div>
            <div className="flex-1 flex justify-end items-center">
              <div className="px-1.5 ring-1 ring-slate-200 rounded">90</div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-14 h-14 flex justify-center items-center font-bold">
              <GiPencil size={42} />
            </div>
            <div className="flex-none flex items-center">русский язык</div>
            <div className="flex-1 flex justify-end items-center">
              <div className="px-1.5 ring-1 ring-slate-200 rounded">76</div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-14 h-14 flex justify-center items-center font-bold">
              <RiComputerLine size={42} />
            </div>
            <div className="flex-none flex items-center">информатика</div>
            <div className="flex-1 flex justify-end items-center">
              <div className="px-1.5 ring-1 ring-slate-200 rounded">76</div>
            </div>
          </div>
        </ul>
      </div>
      <div className="flex justify-end mt-2">
        <CreateMarkModal />
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          к направлениям
        </button>
      </div>
    </>
  );
}

export default UploadMarks;
