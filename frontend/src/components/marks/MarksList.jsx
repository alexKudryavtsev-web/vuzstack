import React from 'react';
import { useSelector } from 'react-redux';
import { getMarks } from '../../store/selectors';
import translateExamName from '../../utils/translateExamName';
import getIconForExam from '../../utils/getIconForExam';

function MarksList() {
  const marks = useSelector(getMarks);

  if(!marks.length) {
    return  <div className="divide-y divide-slate-100">
        <h1>Загрузите ЕГЭ, которые сдавали</h1>
    </div>
  }

  return (
    <div className="divide-y divide-slate-100">
      <ul className="divide-y divide-slate-100">
        {marks.map((mark) => (
          <div className="flex" key={mark.id}>
            <div className="flex-none w-14 h-14 flex justify-center items-center font-bold">
              {getIconForExam(mark.exam)}
            </div>
            <div className="flex-none flex items-center">
              {translateExamName(mark.exam)}
            </div>
            <div className="flex-1 flex justify-end items-center">
              <div className="px-1.5 ring-1 ring-slate-200 rounded">
                {mark.result}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MarksList;
