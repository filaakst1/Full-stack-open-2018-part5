import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'


describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'filaakst',
      likes: 10
    }
    const onClick = () => {}

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    const contentDiv = simpleBlogComponent.find('.content')

    expect(contentDiv.text()).toContain(note.content)
  })
})