import { useState } from 'react'

export const useSubmission = () => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const obj = {
            content,
            author,
            info,
            votes: 0
        }

    return {
        setContent,
        setAuthor,
        setInfo,
        content,
        obj
    }
}
