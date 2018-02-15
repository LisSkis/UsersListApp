import { combineReducers } from 'redux';

import users from './users';
import user from './user';
import errorModal from './errorModal';

const rootReducer = combineReducers({
  users,
  user,
  errorModal,
});

export default rootReducer;
