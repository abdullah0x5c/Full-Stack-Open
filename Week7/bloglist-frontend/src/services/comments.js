import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment,
  })
  return response.data
}

export default { addComment }
