import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../redux/actions/profile-actions';
import {
  Card,
  List,
  Grid,
  Table,
  Label,
  Icon,
  Header,
  Divider
} from 'semantic-ui-react';

const ProfileGithubRepos = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <Card>
      <Card.Content>
        <Header as="h1">
          <Icon name="github" /> Github Repos
        </Header>
        <Divider />
        <Table celled>
          {repos === null ? (
            <h4>No repos found for this user!</h4>
          ) : (
            repos.map(repo => (
              <Table.Row key={repo.id}>
                <Table.Cell>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </Table.Cell>
                <Table.Cell singleLine>
                  <List>
                    <List.Item>
                      <Label color="blue">{repo.stargazers_count}</Label> Stars
                    </List.Item>
                    <List.Item>
                      <Label color="orange">{repo.watchers_count}</Label>{' '}
                      Watchers
                    </List.Item>
                    <List.Item>
                      <Label color="teal">{repo.forks_count}</Label> Forks
                    </List.Item>
                  </List>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table>
      </Card.Content>
    </Card>
  );
};

ProfileGithubRepos.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = ({ profileReducer }) => ({
  repos: profileReducer.repos
});

const mapDispatchToProps = {
  getGithubRepos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileGithubRepos);
