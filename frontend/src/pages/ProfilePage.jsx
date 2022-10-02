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
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6 my-10">
                <ProfileHeader />
                <div className="border-t border-gray-300 text-center pt-10">
                  <Outlet />
                  <ReadyButton />
                </div>
              </div>
            </div>
          </div>
        </section>
        <CookieBanner />
      </main>
    </>
  );
}
