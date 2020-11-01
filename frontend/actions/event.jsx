export function addEvent(event) {
  return {type: 'ADD_EVENT', event}
}

export function updateCurrentEvent(event) {
  return {type: 'UPDATE_CURRENT_EVENT', event}
}