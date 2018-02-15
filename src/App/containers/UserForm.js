import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import BootstrapInput from '../components/BootstrapInput';
import FormButton from '../components/FormButton';
import GeolocationInput from '../components/GeolocationInput';
import SendingModal from '../components/SendingModal';

import ErrorModal from './ErrorModal';

import { checkIfAnyFieldIsEmpty, emailValidator } from '../../utils/helpers';

import {
  fetchSingleUser,
  addUserRequest,
  editUserRequest,
  openErrorModal,
  closeErrorModal,
} from '../../actions';

import styles from '../style.css';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    }
    
    this.actionType = this.props.location.pathname === '/add' ? 'add' : 'edit';
    this.id = this.props.match.params.id || undefined;
    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGeolocationChange = this.handleGeolocationChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentWillMount() {
    if (this.actionType === 'edit') {
      const userIndex = this.props.users.findIndex(user => parseInt(user.id, 10) === parseInt(this.id, 10));
      if (userIndex !== -1) {
        this.setState(_.pick(this.props.users[userIndex],
          ['name', 'username', 'email', 'address', 'phone', 'website', 'company']));
      } else {
        await this.props.dispatch(fetchSingleUser(this.id));
        
        if (this.props.user.hasOwnProperty('name')) {
          this.setState(_.pick(this.props.user,
            ['name', 'username', 'email', 'address', 'phone', 'website', 'company']));
        } else {
          this.props.history.push('/');
        }
      }
    }
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleAddressChange(e) {
    e.preventDefault();

    const address = Object.assign({}, this.state.address, {[e.target.name]: e.target.value});

    this.setState({
      address,
    });
  }

  handleGeolocationChange(e) {
    e.preventDefault();

    const geo = Object.assign({}, this.state.address.geo, {[e.target.name]: e.target.value});
    const address = Object.assign({}, this.state.address, { geo });

    this.setState({
      address,
    });
  }

  handleCompanyChange(e) {
    e.preventDefault();

    const company = Object.assign({}, this.state.company, {[e.target.name]: e.target.value});

    this.setState({
      company,
    });
  }

  handleModalClose() {
    this.props.dispatch(closeErrorModal());
  }

  async handleClick() {
    if (checkIfAnyFieldIsEmpty(this.state)) {
      return this.props.dispatch(openErrorModal('Fill all fields before submitting form'));
    }

    if (!emailValidator(this.state.email)) {
      return this.props.dispatch(openErrorModal('Enter valid email!'));
    }

    if (this.actionType === 'add') {
      await this.props.dispatch(addUserRequest(this.state));

      if (!this.props.isModalOpened) {
        this.props.history.push('/');
      }
    } else if (this.actionType === 'edit') {
      await this.props.dispatch(editUserRequest(this.id, this.state));

      if (!this.props.isModalOpened) {
        this.props.history.push('/');
      }
    }
  }
  
  render() {
    const {
      username,
      name,
      email,
      address,
      phone,
      website,
      company,
    } = this.state;

    const {
      street,
      suite,
      city,
      zipcode,
      geo,
    } = address;

    const {
      lat,
      lng,
    } = geo;

    const companyName = company.name;
    
    const {
      catchPhrase,
      bs,
    } = company;

    return (
      <Grid>
        <Row className={styles['root']}>
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              <BootstrapInput
                placeholder="Username"
                name="username"
                value={username}
                handleChange={this.handleChange}
                />
              <BootstrapInput
                placeholder="Name"
                name="name"
                value={name}
                handleChange={this.handleChange}
                />
              <BootstrapInput
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                handleChange={this.handleChange}
                />
              <BootstrapInput
                placeholder="Street"
                name="street"
                value={street}
                handleChange={this.handleAddressChange}
                />
              <BootstrapInput
                placeholder="Suite"
                name="suite"
                value={suite}
                handleChange={this.handleAddressChange}
                />
              <BootstrapInput
                placeholder="City"
                name="city"
                value={city}
                handleChange={this.handleAddressChange}
                />
              <BootstrapInput
                placeholder="Zipcode"
                name="zipcode"
                value={zipcode}
                handleChange={this.handleAddressChange}
                />
              <GeolocationInput
                lat={lat}
                lng={lng}
                handleChange={this.handleGeolocationChange}
                />
              <BootstrapInput
                placeholder="Phone"
                name="phone"
                value={phone}
                handleChange={this.handleChange}
                />
              <BootstrapInput
                placeholder="Website"
                name="website"
                value={website}
                handleChange={this.handleChange}
                />
              <BootstrapInput
                placeholder="Company name"
                name="name"
                value={companyName}
                handleChange={this.handleCompanyChange}
                />
              <BootstrapInput
                placeholder="Catch phrase"
                name="catchPhrase"
                value={catchPhrase}
                handleChange={this.handleCompanyChange}
                />
              <BootstrapInput
                placeholder="Business Service"
                name="bs"
                value={bs}
                handleChange={this.handleCompanyChange}
                />
              <FormButton
                handleClick={this.handleClick}
                />
            </Form>
          </Col>
          {
            this.props.isSending &&
            <SendingModal
              actionType={this.actionType}
              modalStyle={styles['modal']}
              loadingStyle={styles['loading']}
              />
          }
          {
            this.props.isModalOpened &&
            <ErrorModal />
          }
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    user: state.user.user,
    isModalOpened: state.errorModal.isOpened,
    isSending: state.users.isSending,
  }
}

export default connect(mapStateToProps)(withRouter(UserForm));

UserForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
}
