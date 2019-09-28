import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profile-actions';

const Experience = ({ experience, deleteExperience }) => {
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experience.map(exp => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                  ' Now'
                ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExperience(exp._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
