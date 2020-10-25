import {createMuiTheme} from '@material-ui/core/styles'
import {fade} from '@material-ui/core'

const colors = {
  background: '#1f1f1f',
  paper: '#2f2f2f',
  text: '#e0e0e0',
}

const rawBaseTheme = {
  palette: {
    type: 'dark',
    background: {
      default: colors.background,
      paper: colors.paper,
    },
    text: {
      primary: colors.text,
      secondary: fade(colors.text, 0.7),
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: colors.text,
        backgroundColor: colors.paper,
      },
    },
  },
}

export default createMuiTheme(rawBaseTheme)
