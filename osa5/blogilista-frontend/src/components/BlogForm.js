import { useState } from 'react'

import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newTitle}
            name='Title'
            onChange={({ target }) => setNewTitle(target.value)}
            id='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setNewAuthor(target.value)}
            id='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setNewUrl(target.value)}
            id='url'
          />
        </div>
        <button id="blog-create-button" type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
