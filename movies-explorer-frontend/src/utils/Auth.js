import { BASE_API_URL } from "./constants";
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.message}`)
  } 
    return res.json();
}

export const register = (name, email, password) => {
  return fetch(`${BASE_API_URL}/signup`, 
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({ name, email, password })
  })
  .then((res) => getResponseData(res))
  .then((res) => { return res }) //name, email, _id
}
export const authorize = (email, password) => {
  return fetch(`${BASE_API_URL}/signin`, 
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({ email, password })
  })
    .then((res) => getResponseData(res))
    .then((data) => { 
      if (data.token) {
        localStorage.setItem('token', data.token)
        return data
      } else {
        return
      }
    }) 
    .catch((error) => console.log(error))
}

export const getContent = (token) => {
  return fetch(`${BASE_API_URL}/users/me`,
  {
  method: 'GET', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  })
  .then ((res) => getResponseData(res))
  .then(data => data)
}
