import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Button } from 'react-bootstrap';

const FormButton = ({ handleClick }) => (
  <FormGroup controlId="formHorizontalButton">
    <Col sm={10} smOffset={2}>
      <Button onClick={() => handleClick()}>
        Submit
      </Button>
    </Col>
  </FormGroup>
);

export default FormButton;

FormButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
