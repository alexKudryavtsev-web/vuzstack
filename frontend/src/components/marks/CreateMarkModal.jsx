import React, { useState } from 'react';
import { useFormik } from 'formik';
import translateExamName from '../../utils/translateExamName';
import { store } from '../../store';
import { createMark } from '../../store/reducers/userReducer';
import { useSelector } from 'react-redux';
import { getExams } from '../../store/selectors';

function CreateMarkModal() {
  const [showModal, setShowModal] = useState(false);
  const exams = useSelector(getExams);

  const formik = useFormik({
    initialValues: {
      exam: '',
      result: 0,
    },
    validate(data) {
      const errors = {};

      if (data.result <= 0 || data.result > 100) {
        errors.result = 'Значение от 0 до 100';
      }

      if (!data.exam) {
        errors.exam = 'Предмет не выбран';
      }

      return errors;
    },
    onSubmit: (value) => {
      setShowModal(false);

      store.dispatch(createMark(value));
      formik.resetForm();
    },
  });

  return (
    <>
      <button
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        добавить
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative" style={{ minWidth: 300 }}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Баллы ЕГЭ</h3>
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
                  <div className="mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="exam"
                    >
                      {formik.errors.exam || 'предмет'}
                    </label>
                    <select
                      id="exam"
                      name="exam"
                      value={formik.exam}
                      onChange={formik.handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>предмет</option>
                      {exams.map((exam) => (
                        <option value={exam} key={exam}>
                          {translateExamName(exam)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-grey-darker text-sm font-bold"
                      htmlFor="result"
                    >
                      {formik.errors.result || 'балл'}
                    </label>
                    <input
                      className="appearance-none border border-red w-full text-grey-darker mb-3 rounded-md  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      id="result"
                      name="result"
                      type="number"
                      placeholder="балл"
                      min={1}
                      max={100}
                      value={formik.values.result}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={formik.handleSubmit}
                  >
                    Ок
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

export default CreateMarkModal;
