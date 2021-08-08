import { API_ROUTE } from "../constants"

export const APICall = (query: string) => {
  return fetch(API_ROUTE,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({query})
  })
}