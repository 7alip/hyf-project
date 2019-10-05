import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth-action';
import { Icon, Menu, Container } from 'semantic-ui-react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <Menu.Item as={Link} to="/profiles">
        Developers
      </Menu.Item>
      <Menu.Item as={Link} to="/dashboard">
        <Icon name="dashboard" /> Dashboard
      </Menu.Item>
      <Menu.Item as={Link} to="/posts">
        Posts
      </Menu.Item>
      <Menu.Item as="a" onClick={logout} href="#!">
        <Icon name="sign-out alternate" /> Logout
      </Menu.Item>
    </>
  );

  const guesLinks = (
    <>
      <Menu.Item as={Link} to="/profiles">
        Developers
      </Menu.Item>
      <Menu.Item as={Link} to="/register">
        Register
      </Menu.Item>
      <Menu.Item as={Link} to="/login">
        Login
      </Menu.Item>
    </>
  );

  return (
    <Menu
      style={{ backgroundColor: 'rgba(0,0,0,.7)', height: '4rem' }}
      inverted
      borderless
      fixed="top"
      size="large">
      <Menu.Item as={Link} to="/" header>
        <Icon name="code" /> HackYourSocial
      </Menu.Item>
      <Menu.Menu position="right">
        {!loading && <>{isAuthenticated ? authLinks : guesLinks}</>}
      </Menu.Menu>
    </Menu>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
