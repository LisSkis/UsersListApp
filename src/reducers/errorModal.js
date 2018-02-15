export default (state = {
  isOpened: false,
  message: '',
}, action) => {
  switch(action.type) {
    case 'OPEN_ERROR_MODAL': {
      return Object.assign({}, state, {
        isOpened: true,
        message: action.message,
      });
    }
    case 'CLOSE_ERROR_MODAL': {
      return Object.assign({}, state, {
        isOpened: false,
        message: '',
      });
    }
    default: 
      return state;
  }
}