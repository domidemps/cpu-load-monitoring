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
  body: {
    flex-grow: 1;
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
      <div>
        <Percentage />
        <Logs />
      </div>
      <Plot />
    </div>
  )
}
