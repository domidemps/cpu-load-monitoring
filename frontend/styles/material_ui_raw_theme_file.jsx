import {createMuiTheme} from '@material-ui/core/styles'
import {fade} from '@material-ui/core'

export const COLORS = {
  background: '#1f1f1f',
  paper: '#2f2f2f',
  text: '#e0e0e0',
  overLoad: '#f55652',
  normalLoad: '#80c728',
}

const rawBaseTheme = {
  palette: {
    type: 'dark',
    background: {
      default: COLORS.background,
      paper: COLORS.paper,
    },
    text: {
      primary: COLORS.text,
      secondary: fade(COLORS.text, 0.7),
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: COLORS.text,
        backgroundColor: COLORS.paper,
      },
    },
  },
}

export default createMuiTheme(rawBaseTheme)
