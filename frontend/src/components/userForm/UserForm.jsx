import React from 'react';

function UserForm() {
  return (
    <div className="grid place-items-center">
      <div className="w-full md:w-11/12 lg:w-8/12 sm:mx-auto">
        <div className="bg-white shadow-sm">
          <div className="leading-loose">
            <form className="">
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="first"
                  htmlType="text"
                  name="first"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="first"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Имя
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                <input
                  id="last"
                  htmlType="text"
                  name="last"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="last"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Ссылка на соц.сеть
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="link"
                  htmlType="text"
                  name="link"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="link"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Фамилия
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                <input
                  id="phone"
                  htmlType="text"
                  name="phone"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Телефон
                </label>
              </div>
              <p className="text-gray-800 font-medium">СНИЛС</p>
              <div className="relative h-10 input-component mb-5 empty mt-2">
                <input
                  id="address"
                  htmlType="text"
                  name="address"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="address"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Номер
                </label>
              </div>
              <p className="text-gray-800 font-medium">Паспорт</p>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                <input
                  id="identitas"
                  htmlType="text"
                  name="identitas"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
              rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="idNumber"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Серия
                </label>
              </div>
              <div className="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                <input
                  id="idState"
                  htmlType="text"
                  name="identitas"
                  className="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-black-500 
            rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                />
                <label
                  htmlFor="idState"
                  className="absolute left-2 transition-all bg-white px-1 text-black-600 text-xs top-0"
                >
                  Номер
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
