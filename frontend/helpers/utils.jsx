import {CONFIG} from '../config'

import every from 'lodash/every'
import takeRight from 'lodash/takeRight'
import filter from 'lodash/filter'

const dayjs = require('dayjs')

export function roundValue(value, decimals) {
  /* Avoid JavaScript rounding problem using exponential notation. */

  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export function isEvent(loadOverTime, type) {
  /* Check if a period of time is a heavy CPU load or a recovery from a heavy CPU load. */

  const startElementIndex = CONFIG.eventMinimumDuration / CONFIG.pingInterval
  // Get rid of initialization null values
  const realLoadsOverTime = filter(loadOverTime, loadObject => {
    return loadObject.load != null
  })
  return (
    realLoadsOverTime.length >= CONFIG.eventMinimumDuration / CONFIG.pingInterval &&
    every(takeRight(realLoadsOverTime, startElementIndex), loadObject => {
      if (type === 'heavy') {
        return loadObject.load > 100
      } else if (type === 'recovery') {
        return loadObject.load < 100
      }
    })
  )
}

export function getEvent(loadOverTime, period) {
  /* Get the load object for a given period of time. */

  const startElementIndex = period / CONFIG.pingInterval
  // Get rid of initialization null values
  const realLoadsOverTime = filter(loadOverTime, loadObject => {
    return loadObject.load != null
  })
  return realLoadsOverTime[realLoadsOverTime.length - startElementIndex]
}

export function getDateTime() {
  let dateTime = dayjs(new Date().toString())
  return dateTime.format('HH:mm:ss')
}