import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'

import Percentage from '../../containers/Percentage'

describe('Percentage', () => {
  let store

  it('renders correctly the current average CPU load', () => {
    store = configureStore([thunk])({
      load: {
        averageLoad: 0.6,
      },
    })
    expect(
      renderer.create(
        <Provider store={store}>
          <Percentage />
        </Provider>,
      ).toJSON(),
    ).toMatchSnapshot()
  })
})
