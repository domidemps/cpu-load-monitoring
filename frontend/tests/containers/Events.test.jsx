import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'

import Events from '../../containers/Events'

describe('Events', () => {
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
            <Events />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
  it('renders correctly the list of events', () => {
    store = configureStore([thunk])({
      load: {
        events: [
          {type: 'heavy', start: '12:30:00', end: '12:33:00'},
          {type: 'recovery', start: '12:33:10', end: null},
        ],
      },
    })
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Events />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
})
