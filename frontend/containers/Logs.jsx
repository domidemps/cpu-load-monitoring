/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = css`
  width: 60%;
  margin: 25px;
  padding: 15px;
`

export default function Logs() {
  return (
    <Paper elevation={1} css={styles}>
      <div
        css={css`
          text-align: center;
        `}>
        <Typography variant="h4">Logs</Typography>
      </div>
    </Paper>
  )
}
