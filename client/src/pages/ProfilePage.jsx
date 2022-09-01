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
    case 'PASSWORD_UPLOAD':
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
        <section className="relative block" style={{ height: '500px' }}>
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
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: '70px' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6 mt-10 mb-10">
                <ProfileHeader />
                {content}
              </div>
            </div>
          </div>
        </section>
        <CookieBanner />
      </main>
    </>
  );
}
