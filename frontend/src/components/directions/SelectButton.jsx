import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../store';
import { selectDirection } from '../../store/reducers/userReducer';
import {
  getDirections,
  getMarks,
  getMaxAmountDirection,
} from '../../store/selectors';
import userPassedExams from '../../utils/userPassedExams';

function SelectButton({ direction }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const directions = useSelector(getDirections);
  const marks = useSelector(getMarks);

  const maxAmountDirection = useSelector(getMaxAmountDirection);

  function handleSelectButton() {
    if (directions.find((anyDirection) => anyDirection.id === direction.id)) {
      setMessage('Место уже было выбрано');
    } else if (!userPassedExams(marks, direction)) {
      setMessage('Подходящие предметы не сданы (или результаты не загружены)');
    } else if (directions.length === maxAmountDirection) {
      setMessage('Выбрано слишком много мест для поступления');
    } else {
      store.dispatch(selectDirection({ directionId: direction.id }));
      setMessage('Место выбрано');
    }

    setShowModal(true);
  }

  return (
    <>
      <div className="absolute top-0 right-0">
        <button onClick={handleSelectButton}>
          <div className="flex items-center justify-center flex-1 h-full rounded-full text-slate-500 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative" style={{ minWidth: 300 }}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-2xl font-semibold">{message}</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl flex justify-center items-center outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default SelectButton;
