import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';
import { ListGroupItem, Row, Col } from 'react-bootstrap';

import UserInfo from '../UserInfo';
import UserButtons from '../UserButtons';

import styles from './style.css';

const UserCard = ({
  isBeingDeleted,
  username,
  name,
  email,
  id,
  handleUserClick,
  handleDeleteClick,
  handleEditClick,
}) => (
  <Loadable
    active={isBeingDeleted}
    spinner
    animate={false}
    text="User is being deleted..."
    className={styles['user-card']}
    >
    <Row>
      <Col md={8}>
      <ListGroupItem
        key={id}
        onClick={() => handleUserClick(id)}
        >
        <UserInfo
          username={username}
          name={name}
          email={email}
          />
        </ListGroupItem>
      </Col>
      <Col md={4}>
      <UserButtons
        id={id}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        />
      </Col>
    </Row>
  </Loadable>
);

export default UserCard;

UserCard.propTypes = {
  isBeingDeleted: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleUserClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};
