import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../store';
import { logout } from '../store/reducers/userReducer';
import { getIsAuth } from '../store/selectors';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Navbar(props) {
  const location = useLocation();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const isAuth = useSelector(getIsAuth);

  if (location.pathname.includes('article')) {
    return null;
  }

  return (
    <>
      <nav
        className={
          (props.transparent
            ? 'top-0 absolute z-50 w-full'
            : 'relative bg-white shadow-lg') +
          ' flex flex-wrap items-center justify-between px-2 py-3 '
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className={
                (props.transparent ? 'text-white' : 'text-gray-800') +
                ' text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
              }
              to="/"
            >
              VuzStack
            </Link>
            <button
              className="cursor-pointer text-xl text-white leading-none px-3 py-1 border border-solid border-transparent rounded block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon
                icon={faBars}
                className={
                  (props.transparent ? 'text-white' : 'text-gray-800') +
                  ' fas fa-bars'
                }
              ></FontAwesomeIcon>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className={
                    (props.transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/alexKudryavtsev-web/vuzstack#readme"
                >
                  <i
                    className={
                      (props.transparent
                        ? 'lg:text-gray-300 text-gray-500'
                        : 'text-gray-500') +
                      ' far fa-file-alt text-lg leading-lg mr-2'
                    }
                  />{' '}
                  о сервисе
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isAuth ? (
                <>
                  <li className="flex items-center">
                    <Link
                      to="/"
                      className={
                        (props.transparent
                          ? 'bg-white text-gray-800 active:bg-gray-100'
                          : 'bg-pink-500 text-white active:bg-pink-600') +
                        ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                      }
                      onClick={() => {
                        store.dispatch(logout());
                        setNavbarOpen(false);
                      }}
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                    >
                      выйти
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <Link
                      to="create-account"
                      className={
                        (props.transparent
                          ? 'bg-white text-gray-800 active:bg-gray-100'
                          : 'bg-pink-500 text-white active:bg-pink-600') +
                        ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                      }
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => setNavbarOpen(false)}
                    >
                      регистрация
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
