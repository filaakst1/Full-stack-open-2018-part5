import React from 'react'
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
export default BlogForm