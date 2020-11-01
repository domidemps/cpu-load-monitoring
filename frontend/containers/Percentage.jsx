/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {useSelector} from 'react-redux'
import {roundValue} from '../helpers/utils'
import {COLORS} from '../styles/material_ui_raw_theme_file'

const styles = css`
  width: 40%;
  margin: 25px;
  padding: 15px;
`

export default function Percentage() {
  const averageLoad = useSelector(state => state.load.averageLoad)
  const color = averageLoad > 1 ? COLORS.heavyLoad : COLORS.normalLoad

  return (
    <Paper elevation={5} css={styles}>
      <div
        css={css`
          text-align: center;
        `}>
        <Typography
          variant="h5"
          css={css`
            margin-bottom: 20px;
          `}>
          Average CPU load
        </Typography>
        <Typography
          variant={averageLoad > 0 ? 'h1' : 'h4'}
          css={css`
            color: ${color};
          `}>
          {averageLoad > 0 ? `${roundValue(averageLoad * 100, 0)}%` : 'Processing...'}
        </Typography>
      </div>
    </Paper>
  )
}
