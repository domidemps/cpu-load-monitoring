import * as methods from '../../helpers/utils'
import {CONFIG} from '../../config'

const dayjs = require('dayjs')

describe('"utils" methods', () => {
  it('Should round a given value', () => {
    expect(methods.roundValue(0.3, 0)).toEqual(0)
    expect(methods.roundValue(0.6, 0)).toEqual(1)
    expect(methods.roundValue(0.3, 1)).toEqual(0.3)
  })
  it('Should check if a period of time is a heavy load', () => {
    const loadOverTime = new Array(CONFIG.historyWindow / CONFIG.pingInterval)
      .fill()
      .map((_, i) => ({
        load: 110,
        time: i,
        color: '',
      }))
    expect(methods.isEvent(loadOverTime, 'heavy')).toEqual(true)
    expect(methods.isEvent(loadOverTime, 'recovery')).toEqual(false)
  })
  it('Should check if a period of time is a recovery', () => {
    const loadOverTime = new Array(CONFIG.historyWindow / CONFIG.pingInterval)
      .fill()
      .map((_, i) => ({
        load: 80,
        time: i,
        color: '',
      }))
    expect(methods.isEvent(loadOverTime, 'heavy')).toEqual(false)
    expect(methods.isEvent(loadOverTime, 'recovery')).toEqual(true)
  })
  it('Should get the load object for a given period of time', () => {
    const time = CONFIG.historyWindow / CONFIG.pingInterval
    const loadOverTime = new Array(time).fill().map((_, i) => ({
      load: 80,
      time: i,
      color: '',
    }))
    expect(methods.getEvent(loadOverTime, 20)).toEqual({
      load: 80,
      time: time - 2,
      color: '',
    })
  })
  it('Should get the current date time in HH:mm:ss format', () => {
    expect(methods.getDateTime()).toEqual(dayjs(new Date().toString()).format('HH:mm:ss'))
  })
})
