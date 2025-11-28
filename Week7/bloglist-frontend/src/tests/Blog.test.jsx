import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from '../components/Blog'

describe('Blog component', () => {
  test('renders title and author, but not url or likes by default', () => {
    const blog = {
      title: 'Test Title',
      author: 'Tester',
      url: 'http://example.com',
      likes: 5,
      user: { name: 'User', username: 'user' },
      id: '1',
    }

    const { container } = render(<Blog blog={blog} user={{ name: 'User' }} />)

    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Test Title')
    expect(blogDiv).toHaveTextContent('Tester')

    expect(container.querySelector('.blogUrl')).toBeNull()
    expect(container.querySelector('.blogLikes')).toBeNull()
  })

  test('shows url and likes when view button is clicked', async () => {
    const blog = {
      title: 'Test Title',
      author: 'Tester',
      url: 'http://example.com',
      likes: 5,
      user: { name: 'User', username: 'user' },
      id: '1',
    }

    render(<Blog blog={blog} user={{ name: 'User' }} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // URL and likes should now be visible
    const urlElement = screen.getByText('http://example.com')
    const likesElement = screen.getByText(/likes/i)

    expect(urlElement).toBeDefined()
    expect(likesElement).toHaveTextContent('5')
  })
})
