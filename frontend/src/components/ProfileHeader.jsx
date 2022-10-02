import React from 'react';
import { Link as NavLink } from 'react-router-dom';

function ProfileHeader() {
  return (
    <>
      <div className="flex flex-wrap justify-center pb-6">
        <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:text-right lg:self-center">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <NavLink to="user-form">
                <span className="text-xl font-bold block tracking-wide text-gray-700">
                  Обо мне
                </span>
              </NavLink>
            </div>
            <div className="mr-4 p-3 text-center">
              <NavLink to="passport">
                <span className="text-xl font-bold block tracking-wide text-gray-700">
                  Паспорт
                </span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <NavLink to="marks">
                <span className="text-xl font-bold block tracking-wide text-gray-700">
                  Баллы ЕГЭ
                </span>
              </NavLink>
            </div>
            <div className="mr-4 p-3 text-center">
              <NavLink to="directions">
                <span className="text-xl font-bold block tracking-wide text-gray-700">
                  ВУЗ-ы
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
