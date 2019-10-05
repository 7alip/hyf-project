import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profile-actions';
import { Table, Button, Header, Icon } from 'semantic-ui-react';

const Experience = ({ experience, deleteExperience }) => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>Experience Credentials</Header.Content>
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Years</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {experience.map(exp => (
            <Table.Row key={exp._id}>
              <Table.Cell>{exp.company}</Table.Cell>
              <Table.Cell className="hide-sm">{exp.title}</Table.Cell>
              <Table.Cell>
                <Moment format="YYYY/MM">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                  ' Now'
                ) : (
                  <Moment format="YYYY/MM">{exp.to}</Moment>
                )}
              </Table.Cell>
              <Table.Cell collapsing>
                <Button
                  inverted
                  size="tiny"
                  icon="trash"
                  color="red"
                  onClick={() => deleteExperience(exp._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  null,
  mapDispatchToProps
)(Experience);
