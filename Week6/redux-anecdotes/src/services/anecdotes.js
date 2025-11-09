const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const addAnecdote = async (content) => {
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

export default { addAnecdote, getAll }