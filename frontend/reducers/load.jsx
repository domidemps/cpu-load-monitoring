export function loadInitialState() {
  return {
    averageLoad: 0,
  }
}

export default (state = loadInitialState(), action) => {
  switch (action.type) {
    case 'GET_AVERAGE_LOAD_SUCCESS':
      return {
        ...state,
        averageLoad: action.averageLoad,
      }
    default:
      return state
  }
}

