import {roundValue} from '../helpers/utils'
import {COLORS} from '../styles/material_ui_raw_theme_file'

const dayjs = require('dayjs')

export function loadInitialState() {
  return {
    averageLoad: 0,
    loadOverTime: new Array(60).fill().map((_, i) => ({
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
    case 'GET_AVERAGE_LOAD_SUCCESS':
      console.log(state)
      const {averageLoad} = action
      const {timer} = state
      let newLoadOverTime = state.loadOverTime
      // Index of the data element to edit
      const index = timer >= 590 ? 59 : (timer % 600) / 10
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
      if (timer >= 600) {
        newLoadOverTime.shift()
      }
      return {
        ...state,
        averageLoad,
        newLoadOverTime,
      }
    case 'INCREMENT_TIMERS':
      // Add 10 seconds to the timer
      let newTimer = state.timer + 10
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
    default:
      return state
  }
}
