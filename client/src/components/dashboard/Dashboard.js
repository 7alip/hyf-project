import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentProfile,
  deleteAccount
} from '../../redux/actions/profile-actions';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {
  Loader,
  Segment,
  Dimmer,
  Container,
  Button,
  Icon,
  Grid
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    if (!profile) getCurrentProfile();
  }, [getCurrentProfile, profile]);

  return (
    <Spinner loading={loading && profile === null}>
      <h1>Dashboard</h1>
      <p>
        <Icon name="user" /> Welcome {user && user.name}
      </p>
      {profile === null ? (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="ui button primary">
            Create Profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />
          <Grid stackable columns={2} style={{ margin: '1rem 0' }}>
            <Grid.Column>
              {profile.experiences.length > 0 && (
                <Experience experience={profile.experiences} />
              )}
            </Grid.Column>
            <Grid.Column>
              {profile.education.length > 0 && (
                <Education education={profile.education} />
              )}
            </Grid.Column>
          </Grid>

          <div style={{ padding: '1rem 0' }}>
            <Button
              icon
              labelPosition="left"
              color="red"
              onClick={() => deleteAccount()}>
              <Icon name="user times" /> Delete My Account
            </Button>
          </div>
        </>
      )}
    </Spinner>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer, profileReducer }) => ({
  auth: authReducer,
  profile: profileReducer
});

const mapDispatchToProps = { getCurrentProfile, deleteAccount };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
