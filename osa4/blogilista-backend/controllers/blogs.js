const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing',
    })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({
      error: 'not the owner of blog',
    })
  }
  await blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing',
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, JSON.parse(JSON.stringify(blog)), {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter