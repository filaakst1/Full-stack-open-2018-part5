import React from 'react'
class Blog extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    return (
      <div>
        <div style={blogStyle} onClick={this.toggleVisibility} >
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
          <div style={blogStyle}>
            <div><a href={this.props.blog.url} >{this.props.blog.url}</a></div>
            <div>{this.props.blog.likes} likes <button>likes</button></div>
            <div>added by {this.props.blog.user.name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog