export default (
  state = {
    isFetching: false,
    isSending: false,
    userBeingDeleted: undefined,
    users: [],
    shouldFetchUsers: true,
  },
  action,
) => {
  switch (action.type) {
    case 'REQUEST_USERS': {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case 'RECEIVE_USERS': {
      return Object.assign({}, state, {
        isFetching: false,
        shouldFetchUsers: false,
        users: [...state.users, ...action.users],
      });
    }
    case 'BEGIN_DELETING_USER': {
      return Object.assign({}, state, {
        userBeingDeleted: action.id,
      });
    }
    case 'STOP_DELETING_USER': {
      return Object.assign({}, state, {
        userBeingDeleted: undefined,
      });
    }
    case 'DELETE_USER': {
      const userIndex = state.users.findIndex((user) => user.id === action.id);
      return Object.assign({}, state, {
        users: [...state.users.slice(0, userIndex), ...state.users.slice(userIndex + 1)],
        userBeingDeleted: undefined,
      });
    }
    case 'BEGIN_ADDING_USER': {
      return Object.assign({}, state, {
        isSending: true,
      });
    }
    case 'ADD_USER': {
      return Object.assign({}, state, {
        users: [...state.users, action.user],
        isSending: false,
      });
    }
    case 'BEGIN_EDITING_USER': {
      return Object.assign({}, state, {
        isSending: true,
      });
    }
    case 'EDIT_USER': {
      return Object.assign({}, state, {
        users: state.users.map(user => {
          return (user.id === action.user.id) ? action.user : user;
        }),
        isSending: false,
      });
    }
    case 'STOP_SENDING': {
      return Object.assign({}, state, {
        isSending: false,
      });
    }
    default: 
      return state;
  }
}