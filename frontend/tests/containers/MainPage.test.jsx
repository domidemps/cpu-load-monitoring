import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'

import MainPage from '../../containers/MainPage'
import {CONFIG} from '../../config'
import {COLORS} from '../../styles/material_ui_raw_theme_file'

describe('MainPage', () => {
  let store

  it('renders correctly', () => {
    store = configureStore([thunk])({
      load: {
        averageLoad: 0.5,
        loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
          load: 50,
          time: '12:00:00',
          color: COLORS.normalLoad,
        })),
        timer: 10,
        events: [{type: 'heavy', start: '12:30:00', end: '12:33:00'}],
        currentEvent: {type: 'recovery', start: '12:33:10', end: null},
      },
    })
    expect(
      renderer
        .create(
          <Provider store={store}>
            <MainPage />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
})
