import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';

const GeolocationInput = ({
  lat,
  lng,
  handleChange,
}) => (
  <FormGroup controlId={`formHorizontalGeolocation`}>
    <Col componentClass={ControlLabel} sm={2}>
      Geolocation
    </Col>
    <Col sm={10}>
      <InputGroup>
        <FormControl
          type='text'
          placeholder='Latitude'
          name='lat'
          value={lat}
          onChange={handleChange}
          />
        <InputGroup.Addon>,</InputGroup.Addon>
        <FormControl
          type='text'
          placeholder='Longitude'
          name='lng'
          value={lng}
          onChange={handleChange}
          />
      </InputGroup>
    </Col>
  </FormGroup>
);

export default GeolocationInput;

GeolocationInput.propTypes = {
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
