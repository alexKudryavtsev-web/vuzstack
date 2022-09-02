import React from 'react';
import Avatar from 'react-avatar';
import { getUser } from '../store/selectors';
import { useSelector } from 'react-redux';

function ProfileHeader() {
  const user = useSelector(getUser);

  return (
    <>
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
        <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:text-right lg:self-center">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                {user.status === 'PASSWORD_UPLOAD' ? 'нет' : 'да'}
              </span>
              <span className="text-sm text-gray-500">Паспорт загружен</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                {user.status === 'MARKS_UPLOAD' ? 'нет' : 'да'}
              </span>
              <span className="text-sm text-gray-500">ЕГЭ указано</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                {user.directions.length >= 2 ? 'да' : 'нет'}
              </span>
              <span className="text-sm text-gray-500">
                Выбрана "Мечта" и "Запас"
              </span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                {user.directions.length}/7
              </span>
              <span className="text-sm text-gray-500">Направлений выбрано</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 mb-5">
        <h3 className="text-3xl font-semibold leading-normal text-gray-800 mb-2">
          {user.firstName} {user.lastName}
        </h3>
      </div>
    </>
  );
}

export default ProfileHeader;
