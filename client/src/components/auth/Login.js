import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth-action';
import PropTypes from 'prop-types';

import {
  Form,
  Input,
  Button,
  Segment,
  Grid,
  GridColumn,
  Header,
  FormField,
  Message,
  Icon
} from 'semantic-ui-react';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      style={{ height: 'calc(100vh - 4em)' }}
      textAlign="center"
      verticalAlign="middle">
      <GridColumn style={{ maxWidth: 450 }}>
        <Header as="h2">Sign In</Header>
        <p>
          <Icon name="user"></Icon> Sign into Your Account
        </p>
        <Segment stacked>
          <Form size="large" onSubmit={onSubmit}>
            <FormField>
              <Input
                icon="at"
                onChange={onChange}
                value={email}
                type="email"
                placeholder="Email Address"
                name="email"
                required
                autoComplete="on"
                fluid
              />
            </FormField>
            <FormField>
              <Input
                icon="lock"
                onChange={onChange}
                value={password}
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="on"
                fluid
              />
            </FormField>
            <Button fluid size="large" type="submit" color="blue">
              Login
            </Button>
          </Form>
          <Message color="blue">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Message>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = ({ authReducer }) => ({
  isAuthenticated: authReducer.isAuthenticated
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
