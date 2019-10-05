import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profile-actions';
import ProfileItem from './ProfileItem';
import {
  Loader,
  Segment,
  Dimmer,
  Container,
  Grid,
  Card,
  Icon
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Spinner loading={loading}>
      <Container>
        <h1>Developers</h1>
        <p>
          <Icon name="connectdevelop" /> Browse and connect with developers
        </p>
        <Card.Group centered as={Grid} stackable itemsPerRow="two">
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h4>No profile found</h4>
          )}
        </Card.Group>
      </Container>
    </Spinner>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer
});

const mapDispatchToProps = {
  getProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
