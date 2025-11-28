import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const Like = ({ blog, user }) => {
  const dispatch = useDispatch()
  const updatedBlog = useSelector((state) =>
    state.blogs.find((b) => b.id === blog.id)
  )
  const likes = updatedBlog ? updatedBlog.likes : blog.likes

  const handleClick = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <>
      likes {likes}
      <button onClick={handleClick}>Like</button>
    </>
  )
}

export default Like
