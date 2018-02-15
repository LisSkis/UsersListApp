import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const UserDetails = ({ users, userId }) => {
  const userIndex = users.findIndex(user => user.id === userId);
  const displayedUser = users[userIndex] || undefined;
  return (
    <ListGroup>
      {
        displayedUser &&
        <div>
          <ListGroupItem header="Name">{displayedUser.name || ''}</ListGroupItem>
          <ListGroupItem header="Username">{displayedUser.username || ''}</ListGroupItem>
          <ListGroupItem header="Email">{displayedUser.email || ''}</ListGroupItem>
          <ListGroupItem header="Address">
            Street: {displayedUser.address.street || ''}<br />
            Suite: {displayedUser.address.suite || ''}<br />
            City: {displayedUser.address.city || ''}<br />
            Zipcode: {displayedUser.address.zipcode || ''}<br />
            Geolocation: {displayedUser.address.geo.lat || ''}, {displayedUser.address.geo.lng || ''}<br />
          </ListGroupItem>
          <ListGroupItem header="Phone">{displayedUser.phone || ''}</ListGroupItem>
          <ListGroupItem header="Website">{displayedUser.website || ''}</ListGroupItem>
          <ListGroupItem header="Company">
            Name: {displayedUser.company.name || ''}<br />
            Catch Phrase: {displayedUser.company.catchPhrase || ''}<br />
            Business Services: {displayedUser.company.bs || ''}<br />
          </ListGroupItem>
        </div>
      }
      </ListGroup>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    userId: state.user.openedUser,
  }
}

export default connect(mapStateToProps)(UserDetails);

UserDetails.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
}
