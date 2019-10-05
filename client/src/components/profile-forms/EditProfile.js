import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile
} from '../../redux/actions/profile-actions';
import {
  Form,
  Select,
  Input,
  TextArea,
  Button,
  Segment,
  Label,
  Card,
  Icon,
  Divider,
  Popup
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => {
    if (!profile) getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [getCurrentProfile, profile, loading, setFormData]);

  const [showSocialInputs, toggleShowSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const options = [
    { key: 'Developer', value: 'Developer', text: 'Developer' },
    {
      key: 'Junior Developer',
      value: 'Junior Developer',
      text: 'Junior Developer'
    },
    {
      key: 'Senior Developer',
      value: 'Senior Developer',
      text: 'Senior Developer'
    },
    { key: 'Manager', value: 'Manager', text: 'Manager' },
    {
      key: 'Student or Learning',
      value: 'Student or Learning',
      text: 'Student or Learning'
    },
    { key: 'Instructor', value: 'Instructor', text: 'Instructor' },
    { key: 'Intern', value: 'Intern', text: 'Intern' },
    { key: 'Other', value: 'Other', text: 'Other' }
  ];

  return (
    <Spinner loading={loading}>
      <Link to="/dashboard" className="ui button secondary" href="dashboard">
        <Icon name="arrow left" /> Go Back
      </Link>
      <Card fluid>
        <Card.Content>
          <h1>Edit Your Profile</h1>
          <p>
            <Icon name="user" /> Let's get some information to make your profile
            stand out
          </p>
          <Divider />
          {!loading && (
            <Form onSubmit={handleSubmit}>
              <Form.Group widths={2}>
                <Form.Field>
                  <Popup
                    on="hover"
                    trigger={
                      <Select
                        name="status"
                        value={status}
                        onChange={handleChange}
                        options={options}
                      />
                    }
                    header="Status"
                    content="Give us an idea of where you are at in your career"
                  />
                </Form.Field>
                <Form.Field>
                  <Popup
                    on="hover"
                    content="Could be your own company or one you work for"
                    header="Company"
                    trigger={
                      <Input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={handleChange}
                      />
                    }
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Field>
                  <Popup
                    on="hover"
                    header="Website"
                    content="Could be your own or a company website"
                    trigger={
                      <Input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={handleChange}
                      />
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Popup
                    on="hover"
                    header="Location"
                    content="City & state suggested (eg. Boston, MA)"
                    trigger={
                      <Input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={handleChange}
                      />
                    }
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Field>
                  <Popup
                    on="hover"
                    header="Skills"
                    content="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                    trigger={
                      <Input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={handleChange}
                      />
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Popup
                    on="hover"
                    header="Github Username"
                    content="If you want your latest repos and a Github link, include
                    your username"
                    trigger={
                      <Input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={handleChange}
                      />
                    }
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Popup
                  on="hover"
                  header="Bio"
                  content="Tell us a little about yourself"
                  trigger={
                    <TextArea
                      placeholder="A short bio of yourself"
                      name="bio"
                      value={bio}
                      onChange={handleChange}
                    />
                  }
                />
              </Form.Field>

              <Form.Field>
                <Button
                  secondary
                  onClick={() => toggleShowSocialInputs(!showSocialInputs)}>
                  Add Social Network Links
                </Button>
                <Label>Optional</Label>
              </Form.Field>
              {showSocialInputs && (
                <>
                  <Form.Field>
                    <Input
                      icon="twitter"
                      iconPosition="left"
                      type="text"
                      placeholder="Twitter URL"
                      name="twitter"
                      value={twitter}
                      onChange={handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      icon="facebook"
                      iconPosition="left"
                      type="text"
                      placeholder="Facebook URL"
                      name="facebook"
                      value={facebook}
                      onChange={handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      icon="youtube"
                      iconPosition="left"
                      type="text"
                      placeholder="YouTube URL"
                      name="youtube"
                      value={youtube}
                      onChange={handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      icon="linkedin"
                      iconPosition="left"
                      type="text"
                      placeholder="Linkedin URL"
                      name="linkedin"
                      value={linkedin}
                      onChange={handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      icon="instagram"
                      iconPosition="left"
                      type="text"
                      placeholder="Instagram URL"
                      name="instagram"
                      value={instagram}
                      onChange={handleChange}
                    />
                  </Form.Field>
                </>
              )}
              <Button primary>Submit</Button>
            </Form>
          )}
        </Card.Content>
      </Card>
    </Spinner>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer
});

const mapDispatchToProps = { getCurrentProfile, createProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
