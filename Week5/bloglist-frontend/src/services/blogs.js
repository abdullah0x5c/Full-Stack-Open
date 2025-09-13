import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const uploadBlog = async newObject => {
  const config = {
    headers: {Authorization : token}
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll , uploadBlog, getAll,  setToken }