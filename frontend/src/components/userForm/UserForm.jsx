import React from 'react';
import { useFormik } from 'formik';
import {
  validSize,
  validText,
  validPassportID,
  validPassportSeries,
  validPhone,
  validSnils,
  validURL,
} from '../../utils/validate';
import { store } from '../../store';
import { uploadUserInfo } from '../../store/reducers/userReducer';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      link: user.link,
      phone: user.phone,
      snils: user.snils,
      passportID: user.passportID,
      passportSeries: user.passportSeries,
    },
    async onSubmit(data) {
      store.dispatch(uploadUserInfo(data));
      navigate('../passport')
    },
    validate(data) {
      const errors = {};

      if (validText(data.firstName)) {
        errors.firstName = 'Имя может содержать только кириллицу';
      }
      if (validSize(data.firstName)) {
        errors.firstName = 'Имя не указано';
      }

      if (validText(data.lastName)) {
        errors.lastName = 'Имя может содержать только кириллицу';
      }
      if (validSize(data.lastName)) {
        errors.lastName = 'Фамилия не указана';
      }

      if (validURL(data.link)) {
        errors.link = 'Невозможная ссылка';
      }
      if (validSize(data.link)) {
        errors.link = 'Ссылка не указана';
      }

      if (validPhone(data.phone)) {
        errors.phone = 'Неверный формат';
      }
      if (validSize(data.phone)) {
        errors.phone = 'Не указан телефон';
      }

      if (validSnils(data.snils)) {
        errors.snils = 'Пример: 402-653-194-78';
      }

      if (validPassportSeries(data.passportSeries)) {
        errors.passportSeries = 'Первые четыре цифры в паспорте';
      }

      if (validPassportID(data.passportID)) {
        errors.passportID = 'Последующие 6 цифр';
      }

      return errors;
    },
  });

  return (
    <div className="grid place-items-center">
      <div className="w-full md:w-11/12 lg:w-8/12 sm:mx-auto">
        <div className="bg-white">
          <div className="leading-loose">
            <form onSubmit={formik.handleSubmit}>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="firstName"
                  htmltype="text"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="first"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.firstName || 'Имя'}
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="lastName"
                  htmltype="text"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="first"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.lastName || 'Фамилия'}
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="phone"
                  htmltype="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.phone || 'Телефон'}
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="link"
                  htmltype="url"
                  name="link"
                  onChange={formik.handleChange}
                  value={formik.values.link}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="first"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.url || 'Ссылка на соц.сеть'}
                </label>
              </div>
              <p className="text-gray-800 font-medium">СНИЛС</p>
              <div className="relative h-10 input-component mb-5 empty mt-2">
                <input
                  id="snils"
                  htmltype="text"
                  name="snils"
                  value={formik.values.snils}
                  onChange={formik.handleChange}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="snils"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.snils || 'Номер'}
                </label>
              </div>
              <p className="text-gray-800 font-medium">Паспорт</p>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="passportSeries"
                  htmltype="text"
                  name="passportSeries"
                  value={formik.values.passportSeries}
                  onChange={formik.handleChange}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="passportSeries"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.passportSeries || 'Серия'}
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                <input
                  id="passportID"
                  htmltype="text"
                  name="passportID"
                  value={formik.values.passportID}
                  onChange={formik.handleChange}
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="passportID"
                  className="absolute left-2 transition-all px-1 text-black-600 text-xs top-0"
                >
                  {formik.errors.passportID || 'Номер'}
                </label>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  htmltype="submit"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  onClick={formik.handleSubmit}
                >
                  Готово
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
