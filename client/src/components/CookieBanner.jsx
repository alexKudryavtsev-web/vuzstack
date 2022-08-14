import React from 'react';
import { useSelector } from 'react-redux';
import { getAcceptedWithCookie } from '../store/selectors';
import { store } from '../store';
import { acceptWithCookie } from '../store/reducers/userReducer';

function CookieBanner() {
  const acceptedWithCookie = useSelector(getAcceptedWithCookie);

  if (acceptedWithCookie) {
    return <div />;
  }

  return (
    <div
      className="fixed left-0 bottom-0 right-0 px-4 pt-2 pb-4 md:py-2 bg-blue-100 z-10 border-t border-blue-700 text-center flex flex-col-reverse md:flex-row items-center justify-center"
      id="cookie-consent"
    >
      Файлы cookie помогают VuzStack. Пользуясь этим сервисом, вы соглашаетесь
      на их использование.
      <div
        className="cursor-pointer px-6 pt-2 pb-4 md:px-0 md:pt-0 md:pb-0"
        data-behavior="accept-cookie-consent"
      >
        <button
          onClick={() => store.dispatch(acceptWithCookie())}
          className="md:mb-0 ml-0 md:ml-4 px-3 py-1 rounded-lg bg-blue-200"
        >
          Ок
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
