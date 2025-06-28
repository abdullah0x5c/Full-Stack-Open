import axios from 'axios'

const url = "http://127.0.0.1:3001/persons"

const showAll = () => {
  return axios
    .get(url)
    .then(response =>
      response.data
    )
}

const postObj = (obj) => {
  return axios
    .post(url, obj)
    .then(response => response.data)
    .catch(error => {
          console.log("error", error)
        })
}

export default {showAll, postObj}