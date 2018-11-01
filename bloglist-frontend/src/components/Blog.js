import React from 'react'
import PropTypes from 'prop-types'

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
    const deleteButtonVisible = { display: this.props.deleteButtonVisible ? '' : 'none' }
    return (
      <div>
        <div style={blogStyle} onClick={this.toggleVisibility} >
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
          <div style={blogStyle}>
            <div><a href={this.props.blog.url} >{this.props.blog.url}</a></div>
            <div>{this.props.blog.likes} likes <button onClick={ e => this.props.likeButtonAction(this.props.blog)} >likes</button></div>
            <div>added by {this.props.blog.user.name}</div>
            <div><button style={deleteButtonVisible} onClick={ e => this.props.deleteButtonAction(this.props.blog)} >delete</button></div>
          </div>
        </div>
      </div>
    )
  }
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteButtonAction: PropTypes.func.isRequired,
  deleteButtonVisible: PropTypes.bool.isRequired,
  likeButtonAction: PropTypes.func.isRequired
  
}
export default Blog