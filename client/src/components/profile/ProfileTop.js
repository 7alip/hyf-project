import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon, Button } from 'semantic-ui-react';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <Card>
      <Image centered src={avatar} alt={name} circular />
      <Card.Content textAlign="center">
        <Card.Header as="h1">{name}</Card.Header>
        <Card.Meta>
          <p>
            <Icon name="suitcase" /> {status}{' '}
            {company && <span>at {company}</span>}
          </p>
          <p>
            <Icon name="map marker alternate" /> <span>{location}</span>
          </p>
        </Card.Meta>
        {social && (
          <Card.Description>
            {website && (
              <Button
                icon
                as="a"
                circular
                color="grey"
                href={website}
                target="_blank"
                rel="noopener noreferrer">
                <Icon size="large" name="globe" />
              </Button>
            )}
            {social.twitter && (
              <Button
                icon
                as="a"
                circular
                color="twitter"
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer">
                <Icon size="large" name="twitter" />
              </Button>
            )}
            {social.facebook && (
              <Button
                icon
                as="a"
                circular
                color="facebook"
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer">
                <Icon size="large" name="facebook" />
              </Button>
            )}
            {social.linkedin && (
              <Button
                icon
                as="a"
                circular
                color="linkedin"
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer">
                <Icon size="large" name="linkedin" />
              </Button>
            )}
            {social.youtube && (
              <Button
                icon
                as="a"
                circular
                color="youtube"
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer">
                <Icon size="large" name="youtube" />
              </Button>
            )}
            {social.instagram && (
              <Button
                icon
                as="a"
                circular
                color="instagram"
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer">
                <Icon color="instagram" size="large" name="instagram" />
              </Button>
            )}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
