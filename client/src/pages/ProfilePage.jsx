import React from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import UploadPassport from '../components/UploadPassport';
import CookieBanner from '../components/CookieBanner';
import { getUser } from '../store/selectors';

export default function Profile() {
  const user = useSelector(getUser);

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
              <div className="px-6 mt-5">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {user.avatar === null ? (
                        <Avatar
                          name={`${user.firstName} ${user.lastName}`}
                          round={true}
                          size={150}
                        />
                      ) : (
                        <Avatar src={user.avatar} round={true} size={150} />
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:self-center">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {user.isVerified ? 'да' : 'нет'}
                        </span>
                        <span className="text-sm text-gray-500">
                          Паспорт загружен
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          да
                        </span>
                        <span className="text-sm text-gray-500">
                          ЕГЭ и ИД загружены
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          нет
                        </span>
                        <span className="text-sm text-gray-500">
                          Выбрана "Мечта" и "Запас"
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          0/7
                        </span>
                        <span className="text-sm text-gray-500">
                          Направлений выбрано
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
                {user.isVerified || <UploadPassport />}
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800"></p>
                    </div>
                  </div>
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
