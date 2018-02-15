import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import UsersList from './containers/UsersList';
import UserDetails from './containers/UserDetails';
import ErrorModal from './containers/ErrorModal';

import styles from './style.css';

const App = ({ isModalOpened }) => (
  <Grid className={styles['root']}>
    <Row>
      <Col md={6} xs={12}>
        <UserDetails />
      </Col>
      <Col md={6} xs={12}>
        <UsersList/>
      </Col>
      {
        isModalOpened && <ErrorModal />
      }
    </Row>
  </Grid>
);

const MapStateToProps = (state) => {
  return {
    isModalOpened: state.errorModal.isOpened,
  }
}

export default connect(MapStateToProps)(App);

App.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
};
