import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })
  describe('user not logged in', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
    })
    it('renders only login', () => {
      app.update()
      const loginForm = app.find(LoginForm)
      console.log(loginForm.debug())
      expect(app.html()).toContain(loginForm.html())
      const blogForm = app.find(BlogForm)
      // Wrapper did not find anything
      expect(blogForm).toHaveLength(0)
      const blogs = app.find(Blog)
      expect(blogs).toHaveLength(0)
    })
  })
})