import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../../store';
import { uploadPassport } from '../../store/reducers/userReducer';
import { getUser } from '../../store/selectors';

export default function UploadPassport() {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  async function handleFileSelect(event) {
    if (!event.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('passport', event.target.files[0]);

    store.dispatch(uploadPassport(formData));

    navigate('../marks')
  }

  if (user.passport) {
    return (
      <div>
        <p>Паспорт загружен</p>
        <img src={user.passport} alt="passport" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center w-full">
        <form>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center h-64 w-80 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6 m-2">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Кликните, чтобы загрузить паспорт
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                png, jpg или jpeg
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onClick={handleFileSelect}
              accept=".png, .jpg, .jpeg"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
