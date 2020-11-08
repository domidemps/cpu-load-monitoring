import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'

import Plot from '../../containers/Plot'
import {COLORS} from '../../styles/material_ui_raw_theme_file'
import {CONFIG} from '../../config'

describe('Plot', () => {
  let store

  it('renders correctly the CPU load over time', () => {
    store = configureStore([thunk])({
      load: {
        loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
          load: 50,
          time: '12:00:00',
          color: COLORS.normalLoad,
        })),
      },
    })
    expect(
      renderer.create(
        <Provider store={store}>
          <Plot />
        </Provider>,
      ).toJSON(),
    ).toMatchSnapshot()
  })
})
