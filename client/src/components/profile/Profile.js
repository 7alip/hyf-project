import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../redux/actions/profile-actions';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepos from './ProfileGithubRepos';
import {
  Loader,
  Segment,
  Dimmer,
  Container,
  Icon,
  Card,
  Grid,
  Button,
  Header,
  Divider
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const Profile = ({
  match,
  auth,
  profile: { profile, loading },
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Spinner loading={profile === null || loading}>
      {profile && (
        <Container>
          <Button.Group style={{ marginBottom: '1rem' }}>
            <Link to="/profiles" className="ui button secondary">
              <Icon name="arrow left" /> Back to profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="ui button primary">
                  <Icon name="edit" /> Edit Profile
                </Link>
              )}
          </Button.Group>
          <Card.Group stackable itemsPerRow={2}>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <Card>
              <Card.Content>
                <Header as="h1">
                  <Icon name="suitcase" /> Experience
                </Header>
                <Divider />
                {profile.experiences.length > 0 ? (
                  <>
                    {profile.experiences.map((exp, index) => (
                      <>
                        <ProfileExperience key={exp._id} experience={exp} />
                        {index !== profile.experiences.length - 1 && (
                          <Divider />
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Header as="h1">
                  <Icon name="graduation cap" /> Education
                </Header>
                <Divider />
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu, index) => (
                      <>
                        <ProfileEducation key={edu._id} education={edu} />
                        {index !== profile.education.length - 1 && <Divider />}
                      </>
                    ))}
                  </>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </Card.Content>
            </Card>
            {profile.githubusername && (
              <ProfileGithubRepos username={profile.githubusername} />
            )}
          </Card.Group>
        </Container>
      )}{' '}
    </Spinner>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ profileReducer, authReducer }) => ({
  profile: profileReducer,
  auth: authReducer
});

const mapDispatchToProps = {
  getProfileById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
