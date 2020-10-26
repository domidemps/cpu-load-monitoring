import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'
import load from 'reducers/load'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    load,
    router: connectRouter(history),
  })(state, action)
}
