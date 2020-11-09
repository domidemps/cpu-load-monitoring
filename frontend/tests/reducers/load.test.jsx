import reducer, {loadInitialState} from '../../reducers/load'
import {getDateTime} from '../../helpers/utils'
import {COLORS} from '../../styles/material_ui_raw_theme_file'
import {CONFIG} from '../../config'

describe('"load" reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 0,
      events: [],
      currentEvent: null,
    })
  })
  it('Should handle GET_AVERAGE_LOAD_SUCCESS', () => {
    const initialState = {
      averageLoad: 0,
      loadOverTime: [
        {load: null, time: 0, color: ''},
        {load: null, time: 1, color: ''},
      ],
      timer: 0,
      events: [],
      currentEvent: null,
    }
    const expectedNewState = {
      averageLoad: 0.5,
      loadOverTime: [
        {load: 50, time: getDateTime(), color: COLORS.normalLoad},
        {load: null, time: 1, color: ''},
      ],
      timer: 0,
      events: [],
      currentEvent: null,
    }
    expect(
      reducer(initialState, {
        type: 'GET_AVERAGE_LOAD_SUCCESS',
        averageLoad: 0.5,
      }),
    ).toEqual(expectedNewState)
  })
  it('Should handle INCREMENT_TIMER', () => {
    const expectedNewState = {
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 10,
      events: [],
      currentEvent: null,
    }
    expect(reducer(loadInitialState(), {type: 'INCREMENT_TIMER'})).toEqual(expectedNewState)
  })
  it('Should handle ADD_EVENT', () => {
    const expectedNewState = {
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 0,
      events: [{type: 'heavy', start: '12:30:00', end: null}],
      currentEvent: null,
    }
    expect(
      reducer(loadInitialState(), {
        type: 'ADD_EVENT',
        event: {type: 'heavy', start: '12:30:00', end: null},
      }),
    ).toEqual(expectedNewState)
  })
  it('Should handle UPDATE_CURRENT_EVENT', () => {
    const expectedNewState = {
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 0,
      events: [],
      currentEvent: {type: 'heavy', start: '12:30:00', end: null},
    }
    expect(
      reducer(loadInitialState(), {
        type: 'UPDATE_CURRENT_EVENT',
        event: {type: 'heavy', start: '12:30:00', end: null},
      }),
    ).toEqual(expectedNewState)
  })
  it('Should handle UPDATE_PREVIOUS_EVENT', () => {
    const initialState = {
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 0,
      events: [
        {type: 'heavy', start: '12:28:00', end: null},
        {type: 'recovery', start: '12:30:00', end: null},
      ],
      currentEvent: null,
    }
    const expectedNewState = {
      averageLoad: 0,
      loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
        load: null,
        time: i,
        color: '',
      })),
      timer: 0,
      events: [
        {type: 'heavy', start: '12:28:00', end: '12:28:30'},
        {type: 'recovery', start: '12:30:00', end: null},
      ],
      currentEvent: null,
    }
    expect(
      reducer(initialState, {
        type: 'UPDATE_PREVIOUS_EVENT',
        event: {type: 'recovery', start: '12:30:00', end: null},
        modification: {end: '12:28:30'},
      }),
    ).toEqual(expectedNewState)
  })
})
