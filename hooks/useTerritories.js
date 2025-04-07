import { useEffect, useState, useCallback } from "react";


export default function useTerritories(initOffset = 0, initLimit = 10) {

  const [ count, setCount ] = useState(0); // the current number of territories
  const [ total, setTotal ] = useState(0); // the total number of territories
  const [ data, setData ] = useState([]); // the current list of territories
  const [ offset, setOffset ] = useState(initOffset); // the current offset
  const [ limit, setLimit ] = useState(initLimit); // the current limit

  


  const getAll = useCallback((offset = 0, limit = 10) => {
    // return fetch(`https://clickunap-api.vercel.app/users?limit=${limit}&offset=${offset}`)
    return fetch(`https://clickunap-api.vercel.app/territories?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then(({data: resData, count: resCount, total: resTotal}) => {
        
        // if the `resData` is not null
        if (resData) {
          // map the `resData` array and update the `data`
          setData(resData.map((territory) => ({
            id: territory.id,
            nameId: territory.name_id,
            name: territory.name,
          })));
        }

        
        setCount(resCount);
        setTotal(resTotal);

      })
      .catch((error) => console.error(error));
  }, [setData, setCount]);
  



  const reload = useCallback(() => {
    getAll(offset, limit);
  }, [offset, limit]);



  
  /**
   * Search for a territory using a nameId
   */
  const search = ({ nameId }) => {
    return new Promise((resolve, reject) => {
      // Do nothing / reject if there's no `nameId`
      if (!nameId) {
        return reject("Please provide a nameId");
      }


      fetch(`https://clickunap-api.vercel.app/territories/search?name_id=${nameId}`)
        .then((response) => response.json())
        .then(({data, count}) => {

          const found = count > 0;

          resolve({data, count, found, error: null});

        })
        .catch((error) => reject({data: null, count: 0, found: false, error: error.message}));
    });

  };


  const create = ({ nameId, name }) => {
    return new Promise(async (resolve, reject) => {
      // Do nothing / reject if there's no `nameId` and `name`
      if (!nameId || !name) {
        return reject({message: "Please provide a nameId and name"});
      }

      // create a form data
      const formData = new FormData();
      formData.append('name_id', nameId);
      formData.append('name', name);

      
      try {
        const response = await fetch(`https://clickunap-api.vercel.app/territories`, 
          { method: 'POST',
            body: formData,
          }
        );

  
        if (response.ok) {
          const responseData = await response.json();
          resolve(responseData);

        } else {
          reject({message: `Failed to create a new territory: ${responseRequest.status} - ${responseRequest.statusText}`});
        }


      } catch (error) {
          reject(error);
      }


    });


  };







  useEffect(() => {
    getAll(offset, limit);
  }, [offset, limit]);


  return {
    data,
    count,
    total,
    offset,
    limit,

    getAll,
    search,
    create,
    reload,

    setOffset,
    setLimit,

  }
}


