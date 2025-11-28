import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Like from '../components/Like'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('Like component', () => {
  test('calls event handler twice when like button clicked twice', async () => {
    const blog = {
      id: '1',
      title: 'Test',
      author: 'Author',
      url: 'http://example.com',
      likes: 0,
      user: { name: 'User' },
    }

    blogService.editBlog.mockResolvedValue({ ...blog, likes: 1 })

    const onLike = vi.fn()

    render(<Like blog={blog} user={{ name: 'User' }} onLike={onLike} />)

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(onLike).toHaveBeenCalledTimes(2)
  })
})
