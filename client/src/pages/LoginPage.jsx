import { useFormik } from 'formik';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import { store } from '../store';
import { login } from '../store/reducers/userReducer';
import { useSelector } from 'react-redux';
import { getIsFailed } from '../store/selectors';
import isMobileDevice from '../utils/isMobileDevice';
import PasswordInput from '../components/PasswordInput';

export default function LoginPage() {
  const isFailed = useSelector(getIsFailed);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(data) {
      store.dispatch(login({ ...data }));
    },
  });

  return (
    <>
      <main>
        <section className="absolute w-full h-full bg-gray-900">
          <div
            className="absolute top-0 w-full h-full bg-cover"
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
                        Войти в аккаунт
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
                        <PasswordInput formik={formik} id="password" />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                          onClick={formik.handleSubmit}
                        >
                          Войти
                        </button>
                      </div>
                      <div className="text-center mt-3">
                        <h6 className="text-sm font-bold">
                          {isFailed === true && 'Неверная почта/пароль'}
                        </h6>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2 z-50">
                    <small className="text-white">
                      <Link to="/forgot-password">Забыли пароль?</Link>
                    </small>
                  </div>
                  <div className="w-1/2 text-right z-50">
                    <NavLink
                      to="/create-account"
                      className="text-white"
                    >
                      <small>Зарегистрироваться</small>
                    </NavLink>
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
