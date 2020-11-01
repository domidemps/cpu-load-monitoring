/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {COLORS} from '../styles/material_ui_raw_theme_file'
import {useSelector} from 'react-redux'
import {darken} from '@material-ui/core'

import isEmpty from 'lodash/isEmpty'
import countBy from 'lodash/countBy'
import get from 'lodash/get'

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
  }
  .normalLoad {
    color: ${COLORS.normalLoad};
  }
  .defaultText {
    margin: 20px;
    color: ${darken(COLORS.text, 0.4)};
  }
`

export default function Events() {
  const events = useSelector(state => state.load.events)
  const occurrences = countBy(events, event => {
    return event.type
  })
  return (
    <Paper elevation={5} css={styles}>
      <div className="alignCenter">
        <Typography variant="h5">Events - Heavy CPU loads</Typography>
        {isEmpty(events) ? (
          <Typography variant="h6" className="defaultText">
            <i>No events to display</i>
          </Typography>
        ) : (
          <Typography variant="h6" className="alignLeft">
            <span className="heavyLoad">{get(occurrences, 'heavy', 0)} total</span>
            <br />
            <span className="normalLoad">{get(occurrences, 'recovery', 0)} recovered</span>
          </Typography>
        )}
      </div>
    </Paper>
  )
}
