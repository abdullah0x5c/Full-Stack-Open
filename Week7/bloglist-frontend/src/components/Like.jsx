import blogService from '../services/blogs'
import { useState } from 'react'

// onLike (optional) is a callback the parent can pass to be notified
// when a like has been successfully processed.
const Like = ({ blog, user, onLike }) => {
  const [likes, setLikes] = useState(blog.likes)

  const handleClick = async () => {
    const Obj = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      const update = await blogService.editBlog(Obj)
      setLikes((l) => l + 1)
      if (onLike) onLike(update)
    } catch (error) {
      // keep the console logging for debugging
      // eslint-disable-next-line no-console
      console.log('error during liking')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return (
    <>
      likes {likes}
      <button onClick={handleClick}>Like</button>
    </>
  )
}

export default Like
