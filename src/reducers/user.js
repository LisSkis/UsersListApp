export default (state = {
  openedUser: -1,
  user: {},
  isFetching: false,
}, action) => {
  switch (action.type) {
    case 'OPEN_USER_DETAILS': {
      return Object.assign({}, state, {
        openedUser: state.openedUser === action.id ? -1 : action.id,
      });
    }
    case 'REQUEST_SINGLE_USER': {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case 'RECEIVE_SINGLE_USER': {
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
      });
    }
    default:
      return state;
  }
}