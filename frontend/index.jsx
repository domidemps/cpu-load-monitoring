import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import CPULoadMonitoring from './root'

import {store} from 'store/configureStore'
import {history} from 'reducers'

// Needed for React Developer Tools
window.React = React

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root'),
  )
}
render(CPULoadMonitoring)

// Hot reloading for dev purposes
if (module.hot) {
  module.hot.accept('./root.jsx', () => {
    const NextCPULoadMonitoring = require('./root').default
    render(NextCPULoadMonitoring)
  })
}