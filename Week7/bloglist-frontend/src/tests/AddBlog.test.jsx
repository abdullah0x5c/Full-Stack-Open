import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddBlog from '../components/AddBlog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('AddBlog component', () => {
  test('calls blogService.uploadBlog with right details when a new blog is created', async () => {
    const uploaded = {
      title: 'New Title',
      author: 'New Author',
      url: 'http://new.url',
      likes: 0,
      id: '123',
    }

    blogService.uploadBlog.mockResolvedValue(uploaded)

    const setBlogs = vi.fn()
    const setNotification = vi.fn()
    const setError = vi.fn()
    const blogs = []

    render(
      <AddBlog
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
        setError={setError}
      />
    )

    // open form
    fireEvent.click(screen.getByText('Add New Blog'))

    // fill inputs
    fireEvent.change(screen.getByLabelText('title:'), {
      target: { value: 'New Title' },
    })
    fireEvent.change(screen.getByLabelText('author:'), {
      target: { value: 'New Author' },
    })
    fireEvent.change(screen.getByLabelText('url:'), {
      target: { value: 'http://new.url' },
    })

    // submit
    fireEvent.click(screen.getByText('Submit'))

    // wait for uploadBlog to be called and for setBlogs to be invoked
    await waitFor(() => expect(blogService.uploadBlog).toHaveBeenCalled())
    expect(blogService.uploadBlog).toHaveBeenCalledWith({
      title: 'New Title',
      author: 'New Author',
      url: 'http://new.url',
      likes: 0,
    })

    await waitFor(() => expect(setBlogs).toHaveBeenCalled())
    // ensure setNotification called with uploaded title
    expect(setNotification).toHaveBeenCalled()
  })
})
