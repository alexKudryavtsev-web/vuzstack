import React from 'react';
import CookieBanner from '../components/CookieBanner';
import ProfileHeader from '../components/ProfileHeader';
import { Outlet } from 'react-router-dom';

export default function Profile() {

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: '350px' }}>
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
