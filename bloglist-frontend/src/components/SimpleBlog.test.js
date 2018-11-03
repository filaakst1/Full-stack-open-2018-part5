import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'


describe.only('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'filaakst',
      likes: 10
    }
    const onClick = () => {}

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    console.log(simpleBlogComponent.debug())

    const titleDiv = simpleBlogComponent.find('.title')
    console.log(titleDiv.debug())

    expect(titleDiv.text()).toContain(`${blog.title} ${blog.author}`)

  })
  it('renders likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'filaakst',
      likes: 10
    }
    const onClick = () => {}

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    console.log(simpleBlogComponent.debug())

    const titleDiv = simpleBlogComponent.find('.likes')
    console.log(titleDiv.debug())

    expect(titleDiv.text()).toContain(`blog has ${blog.likes} likes`)

  })
})