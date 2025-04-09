import { useEffect, useState, useCallback } from "react";


export default function useOffices() {

  const [ count, setCount ] = useState(0); // the current number of managers
  const [ total, setTotal ] = useState(0); // the total number of managers
  const [ data, setData ] = useState([]); // the current list of managers

  const [ offset, setOffset ] = useState(0);
  const [ limit, setLimit ] = useState(50);




  





  const getAll = useCallback((offset = 0, limit = 50) => {
    return new Promise((resolve, reject) => {
      

    fetch(`https://clickunap-api.vercel.app/offices?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then(({data: resData, count: resCount, total: resTotal}) => {
        

        // tell me about it
        console.log(`[useOffices]: resData => `, resData);

        setData(resData);
        setCount(resCount);
        setTotal(resTotal);


        // resolve this
        resolve({ data: resData, count: resCount, total: resTotal });


      })
      .catch((error) => {
        console.error(error);
        // reject this
        reject(error);
      });


    });

  }, [setData, setCount]);
  



  useEffect(() => {
    getAll(offset, limit);
  }, [offset, limit]);


  const reload = useCallback(() => {
    getAll(offset, limit);
  }, [ offset, limit ]);
  



  
  /**
   * Search for an office using the address (by default)
   */
  const search = ({ territory_id, complex_id, address }) => {
    return new Promise((resolve, reject) => {
      // do nothing / reject if there's no address
      if (!address) {
        return reject("Please provide an address");
      }

      // get the correct url
      let seachUrl = `https://clickunap-api.vercel.app/offices/search?address=${address}`;
      (territory_id) && (seachUrl += `&territory_id=${territory_id}`);
      (complex_id) && (seachUrl += `&complex_id=${complex_id}`);


      fetch(seachUrl)
        .then((response) => response.json())
        .then(({data, count, total, error}) => {
          
          const found = (count > 0);

          resolve({data, count, total, found, error});
        })
        .catch((error) => {
          reject({data: null, count: 0, total: 0, found: false, error: error.message});
        });
      
    });

  };

  
  

  const create = ({ territoryId, complexId, address, names = [], emails = [], phonenumbers = []}) => {
    return new Promise(async (resolve, reject) => {
      // Do nothing if there's no `territory_id`, `complex_id` or `address`
      if (!territoryId || !complexId || !address) {
        return reject("Please provide a territory_id, complex_id and address");
      }


      // Create a form data
      const formData = new FormData();
      formData.append('territory_id', territoryId);
      formData.append('complex_id', complexId);
      formData.append('address', address);
      formData.append('names', names.join(','));
      formData.append('emails', emails.join(','));
      formData.append('phonenumbers', phonenumbers.join(','));



      try {

        const response = await fetch('https://clickunap-api.vercel.app/offices', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const responseData = await response.json();
          resolve(responseData);
          
        } else {
          reject({message: `Failed to create a new office: ${response.status} - ${response.statusText}`});
        }

      } catch (error) {
        reject(error);
      }
      
    })
  };









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


