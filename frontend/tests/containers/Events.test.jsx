import React from 'react'
import renderer from 'react-test-renderer'
import Events from '../containers/Events'


test('Events renders correctly', () => {
  const component = renderer.create(
    <Events/>
  )
})