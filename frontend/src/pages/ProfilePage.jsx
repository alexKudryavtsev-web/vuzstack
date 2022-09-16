import React from 'react';
import { useSelector } from 'react-redux';
import UploadPassport from '../components/UploadPassport';
import UploadMarks from '../components/UploadMarks';
import UploadDirections from '../components/UploadDirections';
import CookieBanner from '../components/CookieBanner';
import { getUser } from '../store/selectors';
import ProfileHeader from '../components/ProfileHeader';
import Error404Page from './Error404Page';

export default function Profile() {
  const user = useSelector(getUser);

  let content;

  switch (user.status) {
    case 'PASSPORT_UPLOAD':
      content = <UploadPassport />;
      break;
    case 'MARKS_UPLOAD':
      content = <UploadMarks />;
      break;
    case 'DIRECTIONS_UPLOAD':
      content = <UploadDirections />;
      break;
    case 'AWAITING_RESULT':
      content = null;
      break;
    case 'GET_RESULT':
      content = null;
      break;
    default:
      content = <Error404Page />;
  }

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
                  {content}
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
