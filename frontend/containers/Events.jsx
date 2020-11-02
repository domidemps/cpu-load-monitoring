/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Alert, AlertTitle} from '@material-ui/lab'
import {COLORS} from '../styles/material_ui_raw_theme_file'
import {useSelector} from 'react-redux'
import {darken} from '@material-ui/core'

import isEmpty from 'lodash/isEmpty'
import countBy from 'lodash/countBy'
import get from 'lodash/get'
import map from 'lodash/map'

const styles = css`
  width: 60%;
  margin: 25px;
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
`

export default function Events() {
  const events = useSelector(state => state.load.events)
  const occurrences = countBy(events, event => {
    return event.type
  })

  function displayAlerts(events) {
    if (events == null) {
      return null
    }
    return map(events, event => {
      return event.type === 'heavy' ? (
        <Alert severity="error" className="spaceAround">
          System under heavy CPU load since {event.startAt}
        </Alert>
      ) : (
        <Alert severity="success" className="spaceAround">
          System recovered from heavy CPU load since {event.startAt}
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
        {displayAlerts(events)}
      </div>
    </Paper>
  )
}
