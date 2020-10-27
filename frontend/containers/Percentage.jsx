/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getAverageLoad} from '../actions/load'
import {incrementTimer} from '../actions/timer'
import {roundValue} from '../helpers/utils'
import {COLORS} from '../styles/material_ui_raw_theme_file'

const styles = css`
  width: 40%;
  margin: 25px;
  padding: 15px;
`

export default function Percentage() {
  const dispatch = useDispatch()
  const averageLoad = useSelector(state => state.load.averageLoad)

  // Ping the average CPU load every 10 seconds
  useEffect(() => {
    if (averageLoad === 0) {
      dispatch(getAverageLoad())
    }
    const interval = setInterval(() => {
      dispatch(getAverageLoad())
      dispatch(incrementTimer())
    }, 10000)
    return () => clearInterval(interval)
  }, [averageLoad])

  const color = averageLoad > 1 ? COLORS.overLoad : COLORS.normalLoad

  return (
    <Paper elevation={5} css={styles}>
      <div
        css={css`
          text-align: center;
        `}>
        <Typography
          variant="h4"
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
