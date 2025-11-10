const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


export const getAnecdotes = async () => {
      const response = await fetch(baseUrl)
      if(response.ok) {
        return await response.json()
      }
      throw new Error("Fetch Fail.")
    }

export const addAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, id: getId(), votes: 0 }),
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to fetch notes')
    }

    const data = await response.json()
    return data
}

export const addVote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...anecdote,
            votes: anecdote.votes + 1
        }),
    }
    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if (!response.ok) {
        throw new Error('Failed to update votes')
    }

    const data = await response.json()
    return data
}