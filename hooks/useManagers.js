import { useEffect, useState, useCallback } from "react";


export default function useManagers() {

  const [ count, setCount ] = useState(0); // the current number of managers
  const [ total, setTotal ] = useState(0); // the total number of managers
  const [ data, setData ] = useState([]); // the current list of managers


  const getAll = useCallback((offset = 0, limit = -1) => {
    // return fetch(`https://clickunap-api.vercel.app/users?limit=${limit}&offset=${offset}`)
    return fetch(`https://clickunap-api.vercel.app/managers?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then(({data: resData, count: resCount, total: resTotal}) => {

        setData(resData.map((admin) => ({
          userId: admin.user_id,
          avatarId: admin.avatar_id,
          firstname: admin.first_name,
          lastname: admin.last_name,
          email: admin.email,
          createdAt: admin.created_at,
          role: admin.is_admin ? "admin" : "manager",
        })));
        
        setCount(resCount);
        setTotal(resTotal);

      })
      .catch((error) => console.error(error));
  }, [setData, setCount]);
  


  useEffect(() => {
    getAll();
  }, []);


  return {
    data,
    count,
    total,

    getAll,
  }
}


