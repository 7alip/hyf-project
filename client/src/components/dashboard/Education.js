import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profile-actions';
import { Table, Button, Icon, Header } from 'semantic-ui-react';

const Education = ({ education, deleteEducation }) => {
  return (
    <>
      <Header as="h2">
        <Icon name="graduation cap" />
        <Header.Content>Education Credentials</Header.Content>
      </Header>
      <Table compact striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell>Degree</Table.HeaderCell>
            <Table.HeaderCell>Years</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {education.map(edu => (
            <Table.Row key={edu._id}>
              <Table.Cell>{edu.school}</Table.Cell>
              <Table.Cell>{edu.degree}</Table.Cell>
              <Table.Cell>
                <Moment format="YYYY/MM">{edu.from}</Moment> -{' '}
                {edu.to === null ? (
                  ' Now'
                ) : (
                  <Moment format="YYYY/MM">{edu.to}</Moment>
                )}
              </Table.Cell>
              <Table.Cell collapsing>
                <Button
                  inverted
                  size="tiny"
                  icon="trash"
                  color="red"
                  onClick={() => deleteEducation(edu._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  null,
  mapDispatchToProps
)(Education);
