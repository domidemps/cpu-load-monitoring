/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {ResponsiveBar} from '@nivo/bar'
import {useSelector} from 'react-redux'
import {COLORS} from '../styles/material_ui_raw_theme_file'
import {darken} from '@material-ui/core'

const styles = css`
  margin: 10px 20px 20px 20px;
  padding: 15px;
`

export default function Plot() {
  const {loadOverTime} = useSelector(state => state.load)
  const height = 550

  return (
    <Paper elevation={5} css={styles}>
      <div style={{width: '100%', height}}>
        <Typography
          variant="h5"
          css={css`
            text-align: center;
          `}>
          Average CPU load over time
        </Typography>
        <ResponsiveBar
          data={loadOverTime}
          indexBy="time"
          layout="vertical"
          keys={['load', '']}
          borderWidth={1}
          enableGridX={false}
          enableGridY={true}
          enableLabel={false}
          borderRadius={3}
          borderColor={'inherit'}
          axisLeft={{
            legend: 'Average CPU load (%)',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          axisBottom={{
            tickRotation: -45,
            tickPadding: 10,
            format: values => {
              if (typeof values === 'string') {
                return values
              }
              return ''
            },
          }}
          isInteractive={false}
          colorBy={bar => bar.data.color}
          height={0.9 * height}
          margin={{
            top: 30,
            right: 30,
            bottom: 80,
            left: 60,
          }}
          theme={{
            grid: {
              line: {stroke: darken(COLORS.text, 0.7)},
            },
            axis: {
              ticks: {
                text: {
                  fill: COLORS.text,
                  fontSize: 14,
                },
                line: {stroke: COLORS.text},
              },
              legend: {
                text: {
                  fill: COLORS.text,
                  fontSize: 16,
                },
              },
            },
          }}
        />
      </div>
    </Paper>
  )
}
