import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: {},
      notification: null,
      username: '',
      password: '',
      user: null,
    }
  }
  /**
   * Do stuff after component mounting
   */
  componentDidMount() {
    console.log('Mounted')
    
    blogService.getAll()
    .then(blogs => this.sortBlogs(blogs))
    .then(blogs =>
     this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 
  /**
   * Logout function
   */
  logout = async (event) => {
    event.preventDefault()
    console.log('logout event thrown')
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user: null})
    blogService.setToken(null)
  }
/**
 * Login function
 */
  login = async (event) => {
    event.preventDefault()
    console.log('login event thrown')
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(`Login service returned ${JSON.stringify(user)}`)
      this.setState({ username: '', password: '', user})
    }
    catch(exception) {
      console.log('login failed')
      this.setState({
        notification: {
          message: 'invalid username or password',
          type: 'error'
        }
      })
      setTimeout(() => {
        this.setState({ 
          notification: null
         })
      }, 5000)
    }
  }
  /**
   * Handles login form changes
   */
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  /**
   * Handles blog adding form changes
   */
  handleBlogFieldChange = (event) => {
    const newState = this.state.newBlog
    if(event.target.name === 'title') {
      newState.title = event.target.value
    }

    if(event.target.name === 'author') {
      newState.author = event.target.value
    }

    if(event.target.name === 'url') {
      newState.url = event.target.value
    }
    this.setState({ newBlog: newState} )
    console.log('Change event ' + JSON.stringify(this.state.newBlog))
  }
  /**
   * Event handler for submitting new blog
   */
  addBlog = async (event) => {
    event.preventDefault()
    console.log('Blog submitted')
    const blogObject = this.state.newBlog
    try {
      const newBlog = await blogService.create(blogObject)
      const copy = this.state.blogs.concat(newBlog)
      const sorted = this.sortBlogs(copy)
      this.setState({ 
        blogs: sorted,
        newBlog: {},
        notification: {
          message: `a new blog '${newBlog.title}' by ${newBlog.author} was added`,
          type: 'info'
        }
      
      })
      this.blogForm.toggleVisibility()
    }
    catch(exception) {
      console.log('Blog adding failed')
      this.setState({ 
        notification: {
          message: `Unable to add new blog - ${exception}`,
          type: 'error'
        }
      
      })  
    }
    setTimeout(() => {
      this.setState({ 
        notification: null, 
      })
    }, 5000)
  }
  sortBlogs =(blogs) => {
    const sorted= blogs.sort((a,b)=> b.likes-a.likes)
    return sorted
  }
  likeBlog = async (blog) => {
    console.log(`Like clicked`)
    // Load all blogs, getting single blog would be better but it's not implemented
    const blogs = await blogService.getAll()
    const blogToUpdate = blogs.filter(b => b._id === blog._id).reduce((acc, curr)=>acc)
    try {
      console.log(`Found ${blogToUpdate.title}` )
      blogToUpdate.likes = blogToUpdate.likes +1
      await blogService.update(blogToUpdate)
      // Update state
      const sorted =this.sortBlogs(blogs)
      this.setState({
        blogs:sorted
      })
    }catch (exception ) {
      console.log('Update failed')
    }
    
  }
/**
 * Rendering function
 */
  render() {

    /**
     * Logout form
     */
    const logoutForm = () => (
      <div>
        <form onSubmit={this.logout} >
          {this.state.user.name} logged in <button type="submit">logout</button>
        </form>
      </div>
    )
    const loginForm = () => {
      return (
        <div>
          <LoginForm 
            handleSubmit={this.login}
            handleChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }
    /**
     * New blog form
     */
    const blogsForm = () => (
      <div>
         <h2>blogs</h2>
         { logoutForm() }
        <Togglable buttonLabel='new blog' ref={component => this.blogForm = component}>
          <BlogForm 
            handleSubmit={this.addBlog} 
            handleChange= {this.handleBlogFieldChange}
            title={this.state.newBlog.title} 
            author={this.state.newBlog.author} 
            url={this.state.newBlog.url}
          />
        </Togglable>
        <div>
        {this.state.blogs.map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            likeButtonAction={this.likeBlog}
            ref={component => this.t1 = component}
          />
        )}
        </div>
      </div>
    )
    return (
      <div>
        <Notification notification={this.state.notification} />
        {this.state.user===null ?
          loginForm() :
          blogsForm() 
        } 
      </div>
    )
  }
}

export default App;
