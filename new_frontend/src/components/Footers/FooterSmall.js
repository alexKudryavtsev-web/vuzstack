import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()} VuzStack
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://github.com/alexKudryavtsev-web/vuzstack#readme"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    README
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/vuzstack"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/alexKudryavtsev-web/vuzstack"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/alexKudryavtsev-web/vuzstack/blob/main/LICENSE"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
