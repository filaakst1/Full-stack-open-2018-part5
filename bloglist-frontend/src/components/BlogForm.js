import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({handleSubmit, handleChange, title, author, url}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} >
        <div>title<input type="text" name="title" value={title} onChange={handleChange} /></div>
        <div>author<input type="text" name="author" value={author} onChange={handleChange}/></div>
        <div>url<input type="text" name="url" value={url} onChange={handleChange}/></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string
  
}
export default BlogForm