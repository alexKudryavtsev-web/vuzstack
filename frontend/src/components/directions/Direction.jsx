import React from 'react';
import { NavLink } from 'react-router-dom';
import translateExamName, {
  translateExamToShortName,
} from '../../utils/translateExamName';
import SelectButton from './SelectButton';

function Direction({ direction }) {
  return (
    <div className="my-4 mx-1 rounded-lg relative">
      <NavLink to={`/article/${direction.article?.id}`}>
        <h2 className="text-1xl text-start font-bold text-gray-800">
          {direction.name}
        </h2>
      </NavLink>
      <div className="my-2">
        <div className="text-gray-700 text-start">
          {direction.requiredExams.map((exam) => (
            <p
              key={exam}
              className="text-xs inline-flex mr-1 items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
            >
              {translateExamToShortName(exam)}
            </p>
          ))}
        </div>
        <div className="text-gray-700 text-start mt-1">
          {direction.optionalExams.map((exam) => (
            <div
              key={exam}
              className="text-xs inline-flex mr-1 items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full"
            >
              {translateExamName(exam)}
            </div>
          ))}
        </div>
        <div className="text-start mt-1 text-sm font-bold">
          {direction.budgetPlaces} бюджетных мест
        </div>
        <div className="text-gray-500 text-start mt-1 text-sm font-bold">
          Код: {direction.code}
        </div>
      </div>
      <SelectButton direction={direction} />
    </div>
  );
}

export default Direction;
