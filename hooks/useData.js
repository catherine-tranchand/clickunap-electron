//"use server";





// TODO: Create a `getUser` function
// example: export const getUser = async () => {}

export async function getUserData(token) {
  
  // TODO: Fetch the user info using the given token 
  const dataResponse = await fetch("https://clickunap-api.vercel.app/auth/me", {
    method: "POST",
    body: JSON.stringify({token})
  });

  const userData = await dataResponse.json();

  /*
  const userData = {
    firstname: "Abraham",
    lastname: "Ukachi",
    token
  };
  */


  return new Promise((resolve) => {
    resolve(userData);
  })
}


