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
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  } 
  logout = (event) => {
    event.preventDefault()
    console.log('logout event thrown')
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user: null})
  }
  login = async (event) => {
    event.preventDefault()
    console.log('login event thrown')
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(`Login service returned ${JSON.stringify(user)}`)
      this.setState({ username: '', password: '', user})
    }
    catch(exception) {
      console.log('login failed')
      this.setState({
        error: 'invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
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
    const logoutForm = () => (
      <div>
        <form onSubmit={this.logout} >
          {this.state.user.name} logged in <button type="submit">logout</button>
        </form>
      </div>
    )
    const blogsForm = () => (
      <div>
         <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} />
          { loginForm() }
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.error} />
        { logoutForm() }
        { blogsForm() }
      </div>
    )
  }
}

export default App;
