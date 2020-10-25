/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Percentage from './Percentage'
import Logs from './Logs'
import Plot from './Plot'

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
  .logs {
    width: 60%;
    margin: 25px;
  }
`

export default function MainPage() {
  return (
    <div css={styles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">CPU load monitoring</Typography>
        </Toolbar>
      </AppBar>
      <div className="firstRow">
        <Percentage className="percentage" />
        <Logs className="logs" />
      </div>
      <Plot />
    </div>
  )
}
