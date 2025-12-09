// const API_BASE_URL = 'http://127.0.0.1:8000/api';

// /**
//  * Wrapper genérico para fetch. 
//  */
// export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
//   const url = `${API_BASE_URL}${endpoint}`;
  
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
      

//     },
//     ...options,
//   });

//   if (!response.ok) {
//     throw new Error(`Error API (${response.status}): ${response.statusText}`);
//   }

//   // Retorna el JSON parseado como el tipo genérico T
//   return response.json();
// }