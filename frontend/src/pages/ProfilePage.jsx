import React, { useEffect } from 'react';
import CookieBanner from '../components/CookieBanner';
import ProfileHeader from '../components/ProfileHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import { store } from '../store';
import { readSettings } from '../store/reducers/settingsReducer';
import { useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import ReadyButton from '../components/readyButton/ReadyButton';

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    store.dispatch(readSettings);

    if (!user.firstName) {
      navigate('user-form');
    } else if (!user.passport) {
      navigate('passport');
    } else if (user.marks.length < 3) {
      navigate('marks');
    } else {
      navigate('directions');
    }
  }, []);

  let content;

  if (user.isProcessed && user.result) {
    content = (
      <div className="container mx-auto px-4">
        <div className="relative min-h-[50vh] shadow-lg flex flex-col items-center justify-center min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64">
          <div className="px-6 my-10">
            <div className="pb-6">
              <div className="text-xl font-bold block tracking-wide text-center text-gray-700">
                Поздравляем с успешным поступлением!
              </div>
            </div>
            <div className="text-sm px-10 font-bold block tracking-wide text-center text-gray-700">
              Ты поступил на "{user.result.name}" в "{user.result.vuz.name}"
            </div>
            <div className="text-sm px-10 font-bold block tracking-wide text-center text-gray-700">
              Твои контактные данные высланы в этот ВУЗ. Жди звонка или почты от
              него.
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.isProcessed) {
    content = (
      <div className="container mx-auto px-4">
        <div className="relative min-h-[50vh] shadow-lg flex flex-col items-center justify-center min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64">
          <div className="px-6 my-10">
            <div className="pb-6">
              <div className="text-xl font-bold block tracking-wide text-center text-gray-700">
                К сожалению, ты никуда не поступил :(
              </div>
            </div>
            <div className="text-sm px-10 font-bold block tracking-wide text-center text-gray-700">
              Но не унывай... Все хорошо, что хорошо кончается.
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.ready) {
    content = (
      <div className="container mx-auto px-4">
        <div className="relative min-h-[50vh] shadow-lg flex flex-col items-center justify-center min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64">
          <div className="px-6 my-10">
            <div className="pb-6">
              <div className="text-xl font-bold block tracking-wide text-center text-gray-700">
                Твои данные успешно загружены. 5 августа придет результат :)
              </div>
            </div>
            <div className="text-sm px-10 font-bold block tracking-wide text-center text-gray-700">
              На основе алгоритма сервис сопоставит твои предпочтения с твоими
              баллами и баллами конкурентов
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64">
          <div className="px-6 my-10">
            <ProfileHeader />
            <div className="border-t border-gray-300 text-center pt-10">
              <ReadyButton />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ minHeight: '350px' }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16">{content}</section>
        <CookieBanner />
      </main>
    </>
  );
}
