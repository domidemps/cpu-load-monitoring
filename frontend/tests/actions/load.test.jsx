import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../../actions/load'

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

describe('"load" async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('Creates a GET_AVERAGE_LOAD_SUCCESS when fetching the average CPU load of the system', () => {
    fetchMock.getOnce('/api/average-cpu-load', {
      body: {averageLoad: 0.5},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const expectedActions = [
      {type: 'GETTING_AVERAGE_LOAD'},
      {type: 'GET_AVERAGE_LOAD_SUCCESS', averageLoad: {averageLoad: 0.5}},
    ]
    const store = mockStore({averageLoad: null})
    return store.dispatch(actions.getAverageLoad()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
