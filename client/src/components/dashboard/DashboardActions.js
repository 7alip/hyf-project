import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Grid } from 'semantic-ui-react';

const DashboardActions = () => {
  return (
    <Grid columns={3}>
      <Grid.Column>
        <Link to="/edit-profile" className="ui button primary fluid">
          <Icon name="edit" /> Edit Profile
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/add-experience" className="ui button instagram fluid">
          <Icon name="suitcase" /> Add Experience
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/add-education" className="ui button brown fluid">
          <Icon name="graduation cap" /> Add Education
        </Link>
      </Grid.Column>
    </Grid>
  );
};

export default DashboardActions;
