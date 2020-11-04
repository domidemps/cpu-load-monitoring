/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Percentage from './Percentage'
import Events from './Events'
import Plot from './Plot'
import {useEffect} from 'react'
import {getAverageLoad} from '../actions/load'
import {incrementTimer} from '../actions/timer'
import {useDispatch, useSelector} from 'react-redux'
import {addEvent, updateCurrentEvent, updatePreviousEvent} from '../actions/event'
import {getEvent, isEvent} from '../helpers/utils'
import {CONFIG} from '../config'

import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'

const styles = css`
  display: flex;
  flex-direction: column;
  .firstRow {
    display: flex;
  }
  .percentage {
    width: 40%;
  }
  .events {
    width: 60%;
  }
`

export default function MainPage() {
  const dispatch = useDispatch()
  const averageLoad = useSelector(state => state.load.averageLoad)
  const loadOverTime = useSelector(state => state.load.loadOverTime)
  const timer = useSelector(state => state.load.timer)
  const events = useSelector(state => state.load.events)

  // Ping the average CPU load every 10 seconds
  useEffect(() => {
    if (timer === 0) {
      dispatch(getAverageLoad())
    }
    const interval = setInterval(() => {
      dispatch(getAverageLoad())
      dispatch(incrementTimer())
    }, CONFIG.pingInterval * 1000)
    return () => clearInterval(interval)
  }, [averageLoad])

  // Heavy CPU load:
  // - average CPU load > 1
  // - since more than 2 minutes
  // - no events yet or previous event is a recovery
  useEffect(() => {
    if (isEvent(loadOverTime, 'heavy') && (isEmpty(events) || last(events).type === 'recovery')) {
      const newEventStart = getEvent(loadOverTime, CONFIG.eventMinimumDuration).time
      const newEvent = {
        type: 'heavy',
        start: newEventStart,
        end: null,
      }
      dispatch(addEvent(newEvent))
      dispatch(updateCurrentEvent(newEvent))
      // Update end time of the previous event
      if (last(events)?.type === 'recovery') {
        dispatch(updatePreviousEvent(newEvent, {end: newEventStart}))
      }
    }
    // Recovery of heavy CPU load:
    // - average CPU load < 1
    // - since more than 2 minutes
    // - previous event is a heavy CPU load
    else if (
      isEvent(loadOverTime, 'recovery') &&
      !isEmpty(events) &&
      last(events).type === 'heavy'
    ) {
      const newEventStart = getEvent(loadOverTime, CONFIG.eventMinimumDuration).time
      const newEvent = {
        type: 'recovery',
        start: newEventStart,
        end: null,
      }
      dispatch(addEvent(newEvent))
      dispatch(updateCurrentEvent(newEvent))
      dispatch(updatePreviousEvent(newEvent, {end: newEventStart}))
    }
  })

  return (
    <div css={styles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">CPU load monitoring</Typography>
        </Toolbar>
      </AppBar>
      <div className="firstRow">
        <Percentage className="percentage" />
        <Events className="events" events={events} />
      </div>
      <Plot />
    </div>
  )
}
