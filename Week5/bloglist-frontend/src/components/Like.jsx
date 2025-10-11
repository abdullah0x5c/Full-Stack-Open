import blogService from '../services/blogs'
import { useState } from 'react'

const Like = ({ blog, user }) => {

    let [likes, setLikes] = useState(blog.likes)

    console.log(blog)
    const handleClick = async (id) => {
        let Obj ={
            id: blog.id,
            user: blog.user,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.ur
        }

    try {
        const update = await blogService.editBlog(Obj)
        setLikes(likes + 1)
    }
    catch (error) {
        console.log("error during liking")
        console.log(error)
    }

    }
    return(
        <>
            likes {likes}
            <button onClick = {handleClick}>
                Like
            </button>
        </>
    )

}

export default Like 
