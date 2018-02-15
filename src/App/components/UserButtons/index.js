import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';

const UserButtons = ({ id, handleDeleteClick, handleEditClick }) => (
  <div>
    <ButtonGroup block vertical>
      <Button
        bsStyle="info"
        onClick={() => handleEditClick(id)}
        >
        Edit
      </Button>
      <Button
        bsStyle="danger"
        onClick={() => handleDeleteClick(id)}
        >
        Delete
      </Button>
    </ButtonGroup>
  </div>
);

export default UserButtons;

UserButtons.propTypes = {
  id: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}