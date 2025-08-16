import axios from 'axios'

const dummy = (blogs) => {
    axios
        .post('/api/blogs', blogs)
        .then(
            response => {
                return 1
            }
        )
        .catch(
            err => 0
        )
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(
        (blog) => likes += blog.likes
    )
    return likes
}

const favoriteBlog = (blogs) => {
    let max = -1
    let favorite
    blogs.forEach(
        blog => {
            if(blog.likes>max){
                favorite=blog
                max=blog.likes
            }
        }
    )
    if(max != -1){
        return favorite
    }
    else{
        return -1
    }
}

export {dummy, totalLikes, favoriteBlog}