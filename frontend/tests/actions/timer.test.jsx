import * as actions from '../../actions/timer'

describe('actions', () => {
  it('Should increment the timer', () => {
    const expectedAction = {type: 'INCREMENT_TIMER'}
    expect(actions.incrementTimer()).toEqual(expectedAction)
  })
})
