import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  List,
  Image,
  Icon,
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Card>
      <Card.Content>
        <Grid columns="2">
          <Grid.Column width="5">
            <Image size="huge" src={avatar} bordered />
          </Grid.Column>
          <Grid.Column>
            <Card.Header as="h1">{name}</Card.Header>
            <Card.Meta>
              <p>
                {status} at {company}
              </p>
              <p>
                <Icon name="map marker alternate" /> {location}
              </p>
            </Card.Meta>
          </Grid.Column>
        </Grid>
        <Card.Description style={{ paddingTop: '1rem' }}>
          <List horizontal>
            {skills
              .split(',')
              .slice(0, 4)
              .map((skill, index) => (
                <List.Item key={index}>
                  <List.Content>
                    <Icon name="check circle outline" /> {skill}
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/profile/${_id}`} className="ui button primary fluid">
          View Profile
        </Link>
      </Card.Content>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
