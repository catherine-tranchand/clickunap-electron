import { useEffect, useState, useCallback } from "react";


export default function useManagers() {

  const [ count, setCount ] = useState(0); // the current number of managers
  const [ total, setTotal ] = useState(0); // the total number of managers
  const [ data, setData ] = useState([]); // the current list of managers


  const getAll = useCallback((limit = -1, offset = 0) => {
    return fetch(`https://clickunap-api.vercel.app/managers?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((resData) => {
        setData(resData.managers);
        setCount(resData.count);
        setTotal(resData.total);
      })
      .catch((error) => console.error(error));
  }, [setData, setCount]);
  


  useEffect(() => {
    getAll();
  }, [getAll]);


  return {
    data,
    count,
    total,

    getAll,
  }
}


