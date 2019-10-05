import React from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Icon } from 'semantic-ui-react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <Card>
      <Card.Content>
        {bio && (
          <>
            <h2>{name.trim().split(' ')[0]}'s Bio</h2>
            <p>{bio}</p>
            <Divider />
          </>
        )}
        <h2>Skill Set</h2>
        <div>
          {skills.split(',').map((skill, index) => (
            <div key={index}>
              <Icon name="check" /> {skill}
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
