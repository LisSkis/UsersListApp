import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import uuid from 'uuid-v4';

import { fetchUsers, deleteRequest, openUserDetails } from '../../actions';

import UserCard from '../components/UserCard';

import styles from '../style.css';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  async componentWillMount() {
    if (this.props.shouldFetchUsers) {
      try {
        await this.props.dispatch(fetchUsers());
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleUserClick(id) {
    this.props.dispatch(openUserDetails(id));
  }

  handleDeleteClick(id) {
    this.props.dispatch(deleteRequest(id));
  }

  handleEditClick(id) {
    this.props.history.push(`/edit/${id}`);
  }

  render() {
    return (
      <ListGroup>
        <Link to="/add">
          <Button className={styles['add-button']}>
            Add User
          </Button>
        </Link>
        {
          this.props.users.map((user) => (
            <UserCard
              isBeingDeleted={user.id === this.props.userBeingDeleted}
              username={user.username}
              name={user.name}
              email={user.email}
              id={user.id}
              handleUserClick={this.handleUserClick}
              handleDeleteClick={this.handleDeleteClick}
              handleEditClick={this.handleEditClick}
              key={uuid()}
              />
          ))
        }
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    userBeingDeleted: state.users.userBeingDeleted,
    shouldFetchUsers: state.users.shouldFetchUsers,
  };
};

export default connect(mapStateToProps)(withRouter(UsersList));

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userBeingDeleted: PropTypes.number,
  shouldFetchUsers: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
}
