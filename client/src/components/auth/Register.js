import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert-action';
import { register } from '../../redux/actions/auth-action';
import PropTypes from 'prop-types';
import {
  Grid,
  GridColumn,
  Header,
  Icon,
  Form,
  FormField,
  Input,
  Segment,
  Button,
  Message,
  Label
} from 'semantic-ui-react';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      style={{ height: 'calc(100vh - 4rem)' }}
      textAlign="center"
      verticalAlign="middle">
      <GridColumn style={{ maxWidth: 450 }}>
        <Header as="h2">Sign Up</Header>
        <p>
          <Icon name="user plus" /> Create Your Account
        </p>
        <Segment stacked>
          <Form onSubmit={onSubmit}>
            <FormField>
              <Input
                onChange={onChange}
                type="text"
                placeholder="Name"
                name="name"
                value={name}
              />
            </FormField>
            <FormField>
              <Input
                icon="at"
                onChange={onChange}
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                autoComplete="off"
              />
              <Label pointing>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </Label>
            </FormField>
            <FormField>
              <Input
                icon="lock"
                onChange={onChange}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                autoComplete="off"
              />
            </FormField>
            <FormField>
              <Input
                icon="lock"
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                autoComplete="off"
              />
            </FormField>

            <Button fluid size="large" type="submit" color="violet">
              Register
            </Button>
          </Form>
          <Message color="violet">
            Already have an account? <Link to="/login">Sign In</Link>
          </Message>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = ({ authReducer }) => ({
  isAuthenticated: authReducer.isAuthenticated
});

const mapDispatchToProps = { setAlert, register };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
