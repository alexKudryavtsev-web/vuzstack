import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import DirectionService from '../../services/DirectionService';
import Vuz from './Vuz';

function Search({ text }) {
  const [vuzList, setVuzList] = useState([]);
  const [shownVuz, setShownVuz] = useState(5);
  const [totalVuz, setTotalVuz] = useState(0);

  const fetchData = useCallback(async () => {
    const data = await DirectionService.readVuzList(text.trim());

    setVuzList(data.data.vuzList);
    setTotalVuz(data.data.meta.filted);
  }, [setVuzList, text]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="divide-y">
        {vuzList.slice(0, shownVuz).map((vuz) => (
          <Vuz vuz={vuz} key={vuz.id} />
        ))}
      </div>
      <div className="my-2">
        {(shownVuz < totalVuz && totalVuz !== 0) || (
          <button
            htmltype="submit"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => setShownVuz(shownVuz + 5)}
          >
            больше
          </button>
        )}
      </div>
    </>
  );
}

export default Search;
