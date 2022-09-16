import React from 'react';
import { useFormik } from 'formik';
import AuthService from '../services/AuthService';
import { useState } from 'react';
import parseErrorMessageToText from '../utils/parseErrorObjectToText';
import isMobileDevice from '../utils/isMobileDevice';
import Footer from '../components/Footer';
import PasswordInput from '../components/PasswordInput';

function CreateAccountPage() {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      agree: false,
    },
    async onSubmit(data) {
      try {
        await AuthService.registration(
          data.email,
          data.password,
          data.agree,
        );

        setMessage('Письмо было выслано');
      } catch (error) {
        setMessage(parseErrorMessageToText(error.response.data.message));
      }
    },
  });

  return (
    <>
      <main>
        <section className="absolute w-full h-full bg-gray-900">
          <div
            className="absolute top-0 w-full h-full"
            style={
              isMobileDevice()
                ? {}
                : {
                    backgroundImage:
                      'url(' + require('../assets/img/bg.png') + ')',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                  }
            }
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Зарегистрироваться
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: 'all .15s ease' }}
                          id="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <PasswordInput formik={formik} id='password'/>
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="agree"
                            onChange={formik.handleChange}
                            value={formik.values.agree}
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: 'all .15s ease' }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Я согласен(а) с{' '}
                            <a
                              target="_blank"
                              className="text-blue-600"
                              href="/static/пользовательское соглашение.pdf"
                            >
                              условиями
                            </a>
                          </span>
                        </label>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                          onClick={formik.submitForm}
                        >
                          Зарегистрироваться
                        </button>
                      </div>
                      <div className="text-center mt-3">
                        <h6 className="text-sm font-bold">{message}</h6>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer absolute />
        </section>
      </main>
    </>
  );
}

export default CreateAccountPage;
