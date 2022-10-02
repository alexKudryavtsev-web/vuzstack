import React, { useRef, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import translateExamName from '../../utils/translateExamName';

export default function Vuz({ vuz }) {
  const { name, directions } = vuz;
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('transform duration-700 ease');

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setActive((prevState) => !prevState);
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`);
    setRotate(
      active
        ? 'transform duration-700 ease'
        : 'transform duration-700 ease rotate-180',
    );
  }

  return (
    <div className="flex flex-col border-bottom-slate">
      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-footnote light">{name}</p>
        <BsChevronRight className={`${rotate} inline-block`} />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        {directions.map((direction) => (
          <div key={direction.id} id={direction.id} className="my-3 mx-1 rounded-lg">
            <h2 className="text-1xl text-start font-bold mb-2 text-gray-800">
              {direction.name}
            </h2>
            <div className="text-gray-700 text-start">
              {direction.requiredExams.map((exam) => (
                <p
                  key={exam}
                  className="text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
                >
                  {translateExamName(exam)}
                </p>
              ))}
              {direction.optionalExams.map((exam) => (
                <p
                  key={exam}
                  className="text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full"
                >
                  {translateExamName(exam)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
