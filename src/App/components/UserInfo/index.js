import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ username, name, email }) => (
  <div>
    <p>{username}</p>
    <p>{name}</p>
    <p>{email}</p>
  </div>
);

export default UserInfo;

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}
