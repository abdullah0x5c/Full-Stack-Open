export const resetDatabase = async (request) => {
  await request.post('/api/testing/reset')
}

export const createUser = async (request, user) => {
  await request.post('/api/users', { data: user })
}
