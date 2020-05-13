import apiUrl from '../apiConfig'
import axios from 'axios'

export const todoIndex = (user) => {
  return axios({
    url: apiUrl + '/todos',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// export const movieShow = (id, user) => {
//   return axios({
//     url: apiUrl + '/movies/' + id,
//     method: 'GET',
//     headers: {
//       'Authorization': `Token token=${user.token}`
//     }
//   })
// }
//
// export const movieCreate = (id, user) => {
//   return axios({
//     url: apiUrl + '/movies/',
//     method: 'POST',
//     headers: {
//       'Authorization': `Token token=${user.token}`
//     }
//   })
// }
