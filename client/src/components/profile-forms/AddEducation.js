import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profile-actions';
import PropTypes from 'prop-types';
import {
  Icon,
  Form,
  Input,
  Checkbox,
  Card,
  Button,
  Grid,
  TextArea
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [isCurrent, toggleCurrent] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Spinner>
      <Link className="ui button secondary" to="dashboard">
        <Icon name="arrow left" /> Go Back
      </Link>
      <Card fluid>
        <Card.Content>
          <h1 className="large text-primary">Add An Education</h1>
          <p className="lead">
            <Icon name="code branch" /> Add any school or bootcamp that you have
            attended
          </p>
          <Form onSubmit={handleSubmit}>
            <Grid stackable columns="3">
              <Grid.Row>
                <Form.Field as={Grid.Column}>
                  <label>School</label>
                  <Input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    required
                    value={school}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>Degree</label>
                  <Input
                    type="text"
                    placeholder="* Degree of Certoficate"
                    name="degree"
                    required
                    value={degree}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field as={Grid.Column}>
                  <label>Field of Study</label>
                  <Input
                    type="text"
                    placeholder="Field of Study"
                    name="fieldofstudy"
                    value={fieldofstudy}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Grid.Row>
              <Grid.Row>
                <Form.Field as={Grid.Column}>
                  <label>From Date</label>
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
                  <label>Program Description</label>
                  <TextArea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addEducation
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AddEducation));
