import {roundValue} from '../helpers/utils'
import {COLORS} from '../styles/material_ui_raw_theme_file'

const dayjs = require('dayjs')

export function loadInitialState() {
  return {
    averageLoad: 0,
    loadOverTime: new Array(60).fill().map((_, i) => ({
      load: 0,
      time: i,
      color: '',
    })),
    timer: 0,
  }
}

function getDateTime() {
  let dateTime = dayjs(new Date().toString())
  return dateTime.format('HH:mm:ss')
}

export default (state = loadInitialState(), action) => {
  switch (action.type) {
    case 'GET_AVERAGE_LOAD_SUCCESS':
      const {averageLoad} = action
      let {loadOverTime, timer} = state
      // Index of the data element to edit
      const index = (timer % 600) / 10
      // Add 10 seconds to the timer
      timer += 10
      // For each data element, we compute:
      // - the average load
      // - the current date time
      // - the color of the bar plot
      loadOverTime[index] = {
        load: roundValue(averageLoad * 100, 0),
        time: getDateTime(),
        color: averageLoad > 1 ? COLORS.overLoad : COLORS.normalLoad,
      }
      return {
        ...state,
        averageLoad,
        loadOverTime,
        timer,
      }
    default:
      return state
  }
}
