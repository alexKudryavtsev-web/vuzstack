import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { store } from '../../store';
import { setReady } from '../../store/reducers/userReducer';

function ReadyButton() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(getUser);

  if (!isFilledData(user)) {
    return <div></div>;
  }

  function setReadyBtnHandler() {
    store.dispatch(setReady());
    setShowModal(false);
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        По критериям, вы можете подать заявку на участие в конкурсе на
        поступления. Да?
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative" style={{ maxWidth: 300 }}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Участвовать в поступлении
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl flex justify-center items-center outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  Нажимая кнопку "Готов", вы подаете заявление на участие в
                  конкурсе на поступление. После этого поменять данные, в том
                  числе и выбрать другие места поступления, станет невозможно!
                </div>
                <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    onClick={setReadyBtnHandler}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Готов
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

function isFilledData(user) {
  if (user.directions.length < 2) {
    return false;
  }

  if (user.marks.length < 3) {
    return false;
  }

  if (!user.userInfoUploaded) {
    return false;
  }

  if (!user.passport) {
    return false;
  }

  return true;
}

export default ReadyButton;
