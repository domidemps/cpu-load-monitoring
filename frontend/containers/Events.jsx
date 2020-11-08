/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Alert} from '@material-ui/lab'
import {COLORS} from '../styles/material_ui_raw_theme_file'
import {useSelector} from 'react-redux'
import {darken} from '@material-ui/core'

import isEmpty from 'lodash/isEmpty'
import countBy from 'lodash/countBy'
import get from 'lodash/get'
import map from 'lodash/map'

const styles = css`
  width: 60%;
  height: 245px;
  margin: 20px 20px 10px 10px;
  padding: 15px;
  .alignLeft {
    text-align: left;
  }
  .alignCenter {
    text-align: center;
  }
  .heavyLoad {
    color: ${COLORS.heavyLoad};
    font-size: 16px;
  }
  .normalLoad {
    color: ${COLORS.normalLoad};
    font-size: 16px;
  }
  .defaultText {
    margin: 20px;
    color: ${darken(COLORS.text, 0.4)};
  }
  .spaceAround {
    margin: 5px;
  }
  .bigSpaceAround {
    margin: 15px;
  }
  .scrollable {
    max-height: 130px;
    overflow-y: scroll;
  }
`

export default function Events() {
  const events = useSelector(state => state.load.events)
  const occurrences = countBy(events, event => {
    return event.type
  })

  function displayAlerts(events) {
    if (isEmpty(events)) {
      return null
    }
    return map(events, (event, index) => {
      return event.type === 'heavy' ? (
        <Alert key={`event-${index}`} severity="error" className="spaceAround">
          {`System under heavy CPU load ${
            event.end ? `from ${event.start} to ${event.end}` : `since ${event.start}`
          }`}
        </Alert>
      ) : (
        <Alert key={`event-${index}`} severity="success" className="spaceAround">
          {`System recovered from heavy CPU load ${
            event.end ? `from ${event.start} to ${event.end}` : `since ${event.start}`
          }`}
        </Alert>
      )
    })
  }

  return (
    <Paper elevation={5} css={styles}>
      <div className="alignCenter">
        <Typography variant="h5">Events</Typography>
        {isEmpty(events) ? (
          <Typography variant="h6" className="defaultText">
            <i>No events to display</i>
          </Typography>
        ) : (
          <div className="bigSpaceAround">
            <span className="heavyLoad">{get(occurrences, 'heavy', 0)} heavy CPU loads, </span>
            <span className="normalLoad">{get(occurrences, 'recovery', 0)} recovered</span>
          </div>
        )}
        <div className="scrollable">{displayAlerts(events)}</div>
      </div>
    </Paper>
  )
}
