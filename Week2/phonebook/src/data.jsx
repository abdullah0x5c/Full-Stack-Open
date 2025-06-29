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

const updateObj = (id, obj) => {
  const updationURL = url + "/" + id
  return axios
    .put(updationURL, obj)
    .then(response => response.data)
}

const delObj = (id) => {
  const deletionURL = url + "/" + id
  return axios
    .delete(deletionURL)
    .then(response => response.data)
}

export default {showAll, postObj, delObj, updateObj}