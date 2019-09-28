import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ auth: { isAuthenticated, user, loading } }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {loading ? (
            'Loading'
          ) : (
            <>
              <h1 className="x-large">
                {isAuthenticated
                  ? `Welcome ${user.name}`
                  : 'Developer Connector'}
              </h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              {!isAuthenticated && (
                <div className="buttons">
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-light">
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer
});

export default connect(mapStateToProps)(Landing);
