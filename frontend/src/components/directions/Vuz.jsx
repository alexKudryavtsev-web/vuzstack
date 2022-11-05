import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import ReactAvatar from 'react-avatar';
import Direction from './Direction';

export default function Vuz({ vuz }) {
  const {
    shortName,
    directions,
    article,
    withHostel,
    yearOfFoundation,
    numberOfStudents,
    fullName,
    city,
  } = vuz;
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
        className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <NavLink
          to={`/article/${article?.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ReactAvatar src={vuz.logoUrl} />
          <p className="inline-block text-footnote light pl-2">{shortName}</p>
        </NavLink>
        <BsChevronRight className={`${rotate} inline-block`} />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div>
          <div className="font-bold">{fullName}</div>
          <div>{city}</div>
          <div>Общежитие: {withHostel ? 'да' : 'нет'}</div>
          <div>Основан в {yearOfFoundation}</div>
          <div>Кол-во студентов: {numberOfStudents}</div>
        </div>

        {directions.map((direction) => (
          <Direction
            key={direction.id}
            id={direction.id}
            direction={direction}
          />
        ))}
      </div>
    </div>
  );
}
