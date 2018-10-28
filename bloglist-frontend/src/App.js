import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: {},
      notification: null,
      username: '',
      password: '',
      user: null
    }
  }
  /**
   * Do stuff after component mounting
   */
  componentDidMount() {
    blogService.getAll().then(blogs =>
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
      this.setState({ 
        blogs: this.state.blogs.concat(newBlog),
        newBlog: {},
        notification: {
          message: `a new blog '${newBlog.title}' by ${newBlog.author} was added`,
          type: 'info'
        }
      
      })
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
/**
 * Rendering function
 */
  render() {
    /**
     * Login form
     */
    const loginForm = () => (
      <div>
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
             <div>
               username
               <input
                 type="text"
                 name="username"
                 value={this.state.username}
                 onChange={this.handleLoginFieldChange}
               />
             </div>
             <div>
               password
               <input
                 type="password"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleLoginFieldChange}
               />
             </div>
             <button type="submit">login</button>
           </form>
        </div>
    )
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
    /**
     * New blog form
     */
    const blogsForm = () => (
      <div>
         <h2>blogs</h2>
         { logoutForm() }
         <h2>create new</h2>
         <div>
           <form onSubmit={this.addBlog} >
             <div>title<input  type="text" name="title" value={this.state.newBlog.title} onChange={this.handleBlogFieldChange} /></div>
             <div>author<input type="text" name="author" value={this.state.newBlog.author} onChange={this.handleBlogFieldChange}/></div>
             <div>url<input type="text" name="url" value={this.state.newBlog.url} onChange={this.handleBlogFieldChange}/></div>
             <div><button type="submit">create</button></div>
           </form>
         </div>
         <div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
        </div>
      </div>
    )
    
    if (this.state.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          { loginForm() }
        </div>
      )
    }
    return (
      <div>
        <Notification notification={this.state.notification} />
        { blogsForm() }
      </div>
    )
  }
}

export default App;
