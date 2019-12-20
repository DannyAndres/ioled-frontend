const debug = true;

export default async (call,body) => {
  const BASE_URL = 'https://us-central1-ioled-262100.cloudfunctions.net/App/'+call
  try {
    const response = await fetch(BASE_URL, {
      method: body ? 'POST' : 'GET',
      credentials: 'include',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      if(debug) {
        throw error.message
      }
      return {
        Dolares: []
      };
    });
    return response 
  } catch (error) {
    return 'cors';
  }
}