function gettingAverageLoad() {
  return {type: 'GETTING_AVERAGE_LOAD'}
}

function getAverageLoadSuccess(averageLoad) {
  return {type: 'GET_AVERAGE_LOAD_SUCCESS', averageLoad}
}

function getAverageLoadFailure(error) {
  return {type: 'GET_AVERAGE_LOAD_FAILURE', error}
}

export function getAverageLoad() {
  return dispatch => {
    dispatch(gettingAverageLoad())
    fetch('/api/average-cpu-load', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then(data => {
        dispatch(getAverageLoadSuccess(data))
      })
      .catch(() => {
        console.error('Cannot get the average CPU load')
      })
  }
}
