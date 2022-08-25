import React from 'react';
import { store } from '../store';
import { uploadPassport } from '../store/reducers/userReducer';

export default function UploadPassport() {
  const [passport, setPassport] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('passport', passport);

    store.dispatch(uploadPassport(formData));
  }

  function handleFileSelect(event) {
    console.log('here')
    setPassport(event.target.files[0]);
  }

  return (
    <div className="py-10 border-t border-gray-300 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-9/12 px-4">
          <p className="mb-4 text-lg leading-relaxed text-gray-800">
            Необходимо указать свой паспорт:
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center h-64 w-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                      Кликните, чтобы загрузить
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {passport?.name || 'png, jpg или jpeg'}
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".png, .jpg, .jpeg"
                />
              </label>
            </div>
            <button
              type="submit"
              className="text-white self-start mt-2 uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
