import * as actions from '../../actions/event'

describe('actions', () => {
  const event = {type: 'heavy', start: '12:30:00', end: null}
  it('Should create an action to add an event', () => {
    const expectedAction = {type: 'ADD_EVENT', event}
    expect(actions.addEvent(event)).toEqual(expectedAction)
  })
  it('Should update the current event', () => {
    const expectedAction = {type: 'UPDATE_CURRENT_EVENT', event}
    expect(actions.updateCurrentEvent(event)).toEqual(expectedAction)
  })
  it('Should update the previous event', () => {
    const modification = {end: '12:30:40'}
    const expectedAction = {type: 'UPDATE_PREVIOUS_EVENT', event, modification}
    expect(actions.updatePreviousEvent(event, modification)).toEqual(expectedAction)
  })
})
