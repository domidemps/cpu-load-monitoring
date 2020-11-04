/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useEffect, useState} from 'react'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {useSelector} from 'react-redux'

import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import {COLORS} from '../styles/material_ui_raw_theme_file'

export default function NotificationCenter() {
  const [open, setOpen] = useState()
  const events = useSelector(state => state.load.events)

  useEffect(() => {
    setOpen(true)
  }, [events])

  if (isEmpty(events)) {
    return null
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const isHeavyLoad = last(events).type === 'heavy'

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <Alert
        onClose={handleClose}
        severity={isHeavyLoad ? 'error' : 'success'}
        css={
          isHeavyLoad
            ? css`
                border: solid ${COLORS.heavyLoad};
              `
            : css`
                border: solid ${COLORS.normalLoad};
              `
        }>
        {isHeavyLoad ? 'System under heavy CPU load' : 'System recovered from heavy CPU load'}
      </Alert>
    </Snackbar>
  )
}
