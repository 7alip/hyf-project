import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profile-actions';
import PropTypes from 'prop-types';
import {
  Icon,
  Form,
  Card,
  TextArea,
  Button,
  Grid,
  GridRow,
  Input,
  Checkbox
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [isCurrent, toggleCurrent] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Spinner>
      <Link className="ui button secondary" to="dashboard">
        <Icon name="arrow left" /> Go Back
      </Link>
      <Card fluid>
        <Card.Content>
          <h1 className="large text-primary">Add An Experience</h1>
          <p className="lead">
            <Icon name="code branch" /> Add any developer/programming positions
            that you have had in the past
          </p>
          <Form onSubmit={handleSubmit}>
            <Grid stackable columns="3">
              <Grid.Row>
                <Form.Field as={Grid.Column}>
                  <label>Job Title</label>
                  <Input
                    type="text"
                    placeholder="* Job Title"
                    name="title"
                    required
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>Company</label>
                  <Input
                    type="text"
                    placeholder="* Company"
                    name="company"
                    required
                    value={company}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>Location</label>
                  <Input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Grid.Row>
              <Grid.Row>
                <Form.Field as={Grid.Column}>
                  <label>From</label>
                  <Input
                    type="date"
                    name="from"
                    value={from}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>Current</label>
                  <Checkbox
                    toggle
                    type="checkbox"
                    name="current"
                    value=""
                    checked={current}
                    onChange={() => {
                      setFormData({ ...formData, current: !current });
                      toggleCurrent(!isCurrent);
                    }}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>To Date</label>
                  <Input
                    type="date"
                    name="to"
                    value={to}
                    onChange={handleChange}
                    disabled={isCurrent ? 'disabled' : ''}
                  />
                </Form.Field>
              </Grid.Row>
              <Grid.Row>
                <Form.Field width="16" as={Grid.Column}>
                  <label>Description</label>
                  <TextArea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description}
                    onChange={handleChange}></TextArea>
                </Form.Field>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button primary>Submit</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Card.Content>
      </Card>
    </Spinner>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addExperience
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AddExperience));
