import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, GridColumn, Button, Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const Background = styled(Grid)`
  &&& {
    margin-top: -4rem;
    height: calc(100vh + 4rem);
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
      url('./img/showcase.jpg') center center;
    background-size: cover;
    color: #ffffff;
  }
`;

const Landing = ({ auth: { isAuthenticated, user, loading } }) => (
  <Background textAlign="center" verticalAlign="middle">
    {loading ? (
      <Loader content="Loading" size="huge" />
    ) : (
      <GridColumn>
        <h1>
          {isAuthenticated ? `Welcome ${user.name}` : 'Developer Connector'}
        </h1>
        <p>
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        {!isAuthenticated && (
          <>
            <Link to="/register">
              <Button color="teal" size="large">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button color="blue" size="large">
                Login
              </Button>
            </Link>
          </>
        )}
      </GridColumn>
    )}
  </Background>
);

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer
});

export default connect(mapStateToProps)(Landing);
