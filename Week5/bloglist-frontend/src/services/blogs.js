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

const editBlog = async newObject => {
  const config = {
    headers: {Authorization : token}
  }


  let editUrl = baseUrl + "/" + newObject.id 
  console.log("editBlog frontEnd api")
  console.log(newObject)
  console.log(editUrl)
  const res = await axios.put(editUrl, newObject, config)
  return res.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`
  try {
    const res = await axios.delete(url, config)
    return res.data
  } catch (error) {
    console.error('delete error frontend api side', error)
    throw error
  }
}

export default { getAll, uploadBlog, editBlog, setToken, deleteBlog }