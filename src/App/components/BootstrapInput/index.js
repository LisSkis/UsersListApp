import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

const BootstrapInput = ({
  placeholder,
  type,
  name,
  value,
  handleChange,
}) => (
  <FormGroup controlId={`formHorizontal${placeholder}`}>
    <Col componentClass={ControlLabel} sm={2}>
      {placeholder}
    </Col>
    <Col sm={10}>
      <FormControl
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        />
    </Col>
  </FormGroup>
);

export default BootstrapInput;

BootstrapInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

BootstrapInput.defaultProps = {
  type: 'text',
};
