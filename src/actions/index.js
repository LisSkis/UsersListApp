import {
  getUsers,
  getSingleUser,
  deleteUser as deleteUserFromDatabase,
  addUser as addUserToDatabase,
  editUser as editUserInDatabase,
} from '../utils/httpRequests';

export const requestUsers = () => {
  return {
    type: 'REQUEST_USERS',
  };
}

const requestSingleUser = (id) => {
  return {
    type: 'REQUEST_SINGLE_USER',
    id,
  };
}

export const receiveUsers = users => {
  return {
    type: 'RECEIVE_USERS',
    users,
  };
}

export const receiveSingleUser = user => {
  console.log(user)
  return {
    type: 'RECEIVE_SINGLE_USER',
    user,
  };
}

const beginDeletingUser = id => {
  return {
    type: 'BEGIN_DELETING_USER',
    id,
  };
}

const stopDeletingUser = () => {
  return {
    type: 'STOP_DELETING_USER',
  }
}

const deleteUser = id => {
  return {
    type: 'DELETE_USER',
    id,
  };
}

const beginAddingUser = () => {
  return {
    type: 'BEGIN_ADDING_USER',
  }
}

const addUser = user => {
  return {
    type: 'ADD_USER',
    user,
  }
}

const beginEditingUser = () => {
  return {
    type: 'BEGIN_EDITING_USER',
  }
}

const editUser = (user) => {
  return {
    type: 'EDIT_USER',
    user,
  }
}

const stopSending = () => {
  return {
    type: 'STOP_SENDING',
  }
}

export const openUserDetails = id => {
  return {
    type: 'OPEN_USER_DETAILS',
    id,
  };
}

export const openErrorModal = message => {
  return {
    type: 'OPEN_ERROR_MODAL',
    message,
  };
}

export const closeErrorModal = () => {
  return {
    type: 'CLOSE_ERROR_MODAL',
  };
}

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(requestUsers);

    getUsers().then((response) => {
      if (response.status === 200) {
        dispatch(receiveUsers(response.data));
      } else {
        dispatch(openErrorModal('Could not fetch users from database'));
      }
    });
  }
}

export const deleteRequest = (id) => {
  return (dispatch) => {
    dispatch(beginDeletingUser(id));

    deleteUserFromDatabase(id).then((response) => {
      if (response.status === 200) {
        dispatch(deleteUser(id));
      } else {
        dispatch(openErrorModal('Could not delete user from database'));
        dispatch(stopDeletingUser());
      }
    });
  }
}

export const fetchSingleUser = (id) => {
  return (dispatch) => {
    dispatch(requestSingleUser);

    return getSingleUser(id).then((response) => {
      if (response.data === 200) {
        dispatch(receiveSingleUser(response.data));
      } else {
        dispatch(openErrorModal('There is no user with this id in database'));
      }
    });
  }
}

export const addUserRequest = (userData) => {
  return (dispatch) => {
    dispatch(beginAddingUser());

    return addUserToDatabase(userData).then((response) => {
      if (response.status === 201) {
        dispatch(addUser(response.data));
      } else {
        dispatch(openErrorModal(`Error ${response.status} occured while adding user.`));
        dispatch(stopSending());
      }
    })
  }
}

export const editUserRequest = (userId, userData) => {
  return (dispatch) => {
    dispatch(beginEditingUser());

    return editUserInDatabase(userId, userData).then((response) => {
      if (response.status === 200) {
        dispatch(editUser(response.data));
      } else {
        dispatch(openErrorModal(`Error ${response.status} occured while editing user.`));
        dispatch(stopSending());
      }
    });
  }
}