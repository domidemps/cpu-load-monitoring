/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = css`
  margin: 25px;
  padding: 15px;
`

export default function Plot() {
  return (
    <Paper elevation={1} css={styles}>
      <div>
        <Typography
          variant="h4"
          css={css`
            text-align: center;
          `}>
          Average CPU load over time
        </Typography>
      </div>
    </Paper>
  )
}
