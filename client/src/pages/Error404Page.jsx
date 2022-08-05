import React from 'react';

function Error404Page() {
  return (
    <>
      <main className="absolute w-full h-full bg-gray-900">
        <section className="flex items-center h-full p-16 dark:bg-gray-900 text-white">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                404
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Извини, данная страница не существует
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Error404Page;
