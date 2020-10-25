/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {}

export default function MainPage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">CPU load monitoring</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
