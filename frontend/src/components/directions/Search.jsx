import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import DirectionService from '../../services/DirectionService';
import Vuz from './Vuz';

function Search({ text }) {
  const [vuzList, setVuzList] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await DirectionService.readVuzList(text.trim());

    setVuzList(data.data.vuzList);
  }, [setVuzList, text]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="divide-y">
      {vuzList.map((vuz) => (
        <Vuz vuz={vuz} key={vuz.id} />
      ))}
    </div>
  );
}

export default Search;
