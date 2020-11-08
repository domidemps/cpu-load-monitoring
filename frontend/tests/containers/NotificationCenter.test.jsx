import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'

import NotificationCenter from '../../containers/NotificationCenter'

describe('NotificationCenter', () => {
  let store

  it('renders correctly if no events', () => {
    store = configureStore([thunk])({
      load: {
        events: [],
      },
    })
    expect(
      renderer
        .create(
          <Provider store={store}>
            <NotificationCenter />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
})
