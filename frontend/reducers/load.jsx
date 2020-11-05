import {roundValue} from '../helpers/utils'
import {COLORS} from '../styles/material_ui_raw_theme_file'
import {CONFIG} from '../config'

import findIndex from 'lodash/findIndex'

const dayjs = require('dayjs')

export function loadInitialState() {
  return {
    averageLoad: 0,
    loadOverTime: new Array(CONFIG.historyWindow / CONFIG.pingInterval).fill().map((_, i) => ({
      load: null,
      time: i,
      color: '',
    })),
    timer: 0,
    events: [],
    currentEvent: null,
  }
}

function getDateTime() {
  let dateTime = dayjs(new Date().toString())
  return dateTime.format('HH:mm:ss')
}

export default (state = loadInitialState(), action) => {
  switch (action.type) {
    case 'GET_AVERAGE_LOAD':
      const {averageLoad} = action
      const {timer} = state
      let newLoadOverTime = state.loadOverTime
      // Index of the data element to edit
      const index =
        timer >= CONFIG.historyWindow - CONFIG.pingInterval
          ? CONFIG.historyWindow / CONFIG.pingInterval - 1
          : (timer % CONFIG.historyWindow) / CONFIG.pingInterval
      // For each data element, we compute:
      // - the average load
      // - the current date time
      // - the color of the bar plot
      newLoadOverTime[index] = {
        load: roundValue(averageLoad * 100, 0),
        time: getDateTime(),
        color: averageLoad > 1 ? COLORS.heavyLoad : COLORS.normalLoad,
      }
      // We only want to display a 10 minutes history
      if (timer >= CONFIG.historyWindow) {
        newLoadOverTime.shift()
      }
      return {
        ...state,
        averageLoad,
        newLoadOverTime,
      }
    case 'INCREMENT_TIMER':
      // Add 10 seconds to the timer
      let newTimer = state.timer + CONFIG.pingInterval
      return {
        ...state,
        timer: newTimer,
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.event],
      }
    case 'UPDATE_CURRENT_EVENT':
      return {
        ...state,
        currentEvent: action.event,
      }
    case 'UPDATE_PREVIOUS_EVENT':
      let newEvents = state.events
      const eventIndex = findIndex(newEvents, action.event) - 1
      newEvents[eventIndex] = {...newEvents[eventIndex], ...action.modification}
      return {
        ...state,
        events: newEvents,
      }
    default:
      return state
  }
}
