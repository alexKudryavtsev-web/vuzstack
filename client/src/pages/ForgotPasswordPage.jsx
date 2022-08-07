import { useFormik } from 'formik';
import { useState } from 'react';
import Footer from '../components/Footer';
import AuthService from '../services/AuthService';
import parseErrorMessageToText from '../utils/parseErrorObjectToText';
import isMobileDevice from '../utils/isMobileDevice';

export default function LoginPage() {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    async onSubmit(data) {
      try {
        await AuthService.resetPassword(data.email);

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
                        Восстановление пароля
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
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                          onClick={formik.handleSubmit}
                        >
                          Сброс пароля
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
