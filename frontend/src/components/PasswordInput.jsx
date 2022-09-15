import React from 'react';
import { useState } from 'react';

function PasswordInput({ formik, id }) {
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <label
        className="block uppercase text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        Пароль
      </label>
      <input
        type={isShow ? 'text' : 'password'}
        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        placeholder="Пароль"
        style={{ transition: 'all .15s ease' }}
        id={id}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <input
          className="hidden js-password-toggle"
          id="toggle"
          type="checkbox"
          checked={isShow}
          onChange={() => setIsShow(!isShow)}
        />
        <label
          className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
          htmlFor="toggle"
        >
          {isShow ? 'hide' : 'show'}
        </label>
      </div>
    </>
  );
}

export default PasswordInput;
