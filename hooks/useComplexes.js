import { useEffect, useState, useCallback } from "react";


export default function useComplexes(initOffset = 0, initLimit = 10) {

  const [ count, setCount ] = useState(0); // the current number of complexes
  const [ total, setTotal ] = useState(0); // the total number of complexes
  const [ data, setData ] = useState([]); // the current list of complexes
  const [ offset, setOffset ] = useState(initOffset); // the current offset
  const [ limit, setLimit ] = useState(initLimit); // the current limit


  const getAll = useCallback((offset = 0, limit = 10) => {
    // return fetch(`https://clickunap-api.vercel.app/users?limit=${limit}&offset=${offset}`)
    return fetch(`https://clickunap-api.vercel.app/complexes?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then(({data: resData, count: resCount, total: resTotal}) => {
        
        // if the `resData` is not null
        if (resData) {
          // map the `resData` array and update the `data`
          setData(resData.map((complex) => ({
            complexId: complex.id,
            nameId: complex.name_id,
            territoryId: complex.territory_id,
            name: complex.name,
            directorName: complex.director_name,
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
   * Search for a complex using a nameId
   */
  const search = ({ nameId }) => {
    return new Promise((resolve, reject) => {
      // Do nothing / reject if there's no `nameId`
      if (!nameId) {
        return reject("Please provide a nameId");
      }


      fetch(`https://clickunap-api.vercel.app/complexes/search?name_id=${nameId}`)
        .then((response) => response.json())
        .then(({data, count}) => {

          const found = count > 0;

          resolve({data, count, found, error: null});

        })
        .catch((error) => reject({data: null, count: 0, found: false, error: error.message}));
    });

  };


  const create = ({ territoryId, nameId, name, directorName }) => {
    return new Promise(async (resolve, reject) => {
      // Do nothing / reject if there's no `nameId` and `name`
      if (!nameId || !name) {
        return reject({message: "Please provide a nameId and name"});
      }

      // create a form data
      const formData = new FormData();
      formData.append('territory_id', territoryId);
      formData.append('name_id', nameId);
      formData.append('name', name);
      formData.append('director_name', directorName);

      
      try {
        const response = await fetch(`https://clickunap-api.vercel.app/complexes`, 
          { method: 'POST',
            body: formData,
          }
        );

  
        if (response.ok) {
          const responseData = await response.json();
          resolve(responseData);

        } else {
          reject({message: `Failed to create a new complex: ${responseRequest.status} - ${responseRequest.statusText}`});
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
    reload,

    getAll,
    search,
    create,

    setOffset,
    setLimit,

  }
}


