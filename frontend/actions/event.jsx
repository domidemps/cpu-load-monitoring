export function addEvent(event) {
  return {type: 'ADD_EVENT', event}
}

export function updateCurrentEvent(event) {
  return {type: 'UPDATE_CURRENT_EVENT', event}
}

export function updatePreviousEvent(event, modification) {
  return {type: 'UPDATE_PREVIOUS_EVENT', event, modification}
}