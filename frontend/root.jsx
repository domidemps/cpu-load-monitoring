import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import CssBaseline from '@material-ui/core/CssBaseline'

import {MuiThemeProvider} from '@material-ui/core/styles'

import theme from 'styles/material_ui_raw_theme_file'
import MainPage from './containers/MainPage'

require('./main.css')

const CPULoadMonitoring = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <div>
            <CssBaseline />
            <Switch>
              <Route exact path="/" render={() => <MainPage />} />
              <Route render={() => <div>Page not found</div>} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}
export default CPULoadMonitoring
