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
import {incrementTimers} from '../actions/timer'
import {useDispatch, useSelector} from 'react-redux'
import {addEvent, updateCurrentEvent} from '../actions/event'
import {getEvent, isEvent} from '../helpers/utils'

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
    margin: 25px;
  }
  .events {
    width: 60%;
    margin: 25px;
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
      dispatch(incrementTimers())
    }, 10000)
    return () => clearInterval(interval)
  }, [averageLoad])

  // Heavy CPU load:
  // - average CPU load > 1
  // - since more than 2 minutes
  // - no last event or last event is a recovery
  useEffect(() => {
    if (
      isEvent(loadOverTime, 120, 'heavy') &&
      (isEmpty(events) || last(events).type === 'recovery')
    ) {
      const event = {type: 'heavy', startAt: getEvent(loadOverTime, 120).time}
      dispatch(addEvent(event))
      dispatch(updateCurrentEvent(event))
    }
    // Recovery of heavy CPU load:
    // - average CPU load < 1
    // - since more than 2 minutes
    // - last event is a heavy CPU load
    else if (
      isEvent(loadOverTime, 120, 'recovery') &&
      !isEmpty(events) &&
      last(events).type === 'heavy'
    ) {
      const event = {type: 'recovery', startAt: getEvent(loadOverTime, 120).time}
      dispatch(addEvent(event))
      dispatch(updateCurrentEvent(event))
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
