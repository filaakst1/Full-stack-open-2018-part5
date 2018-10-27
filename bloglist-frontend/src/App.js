import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 
  login = (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username, this.state.password)
  }
  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  render() {
    if (this.state.user === null) {
    return (
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
    )}
    return (
      <div>
         <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
