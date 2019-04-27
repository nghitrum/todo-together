import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_TODOES, GET_ALL_TODOES_SHARED_WITH_ME } from '../GQL/Query';
import ToDo from './ToDo/ToDo';

const List = () => (
  <div>
    {localStorage.getItem('isLoggedIn') && (
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="nav-my-todoes-tab"
              data-toggle="tab"
              href="#nav-my-todoes"
              role="tab"
              aria-controls="nav-my-todoes"
              aria-selected="true"
            >
              My ToDoes
            </a>
            <a
              className="nav-item nav-link"
              id="nav-shared-with-me-tab"
              data-toggle="tab"
              href="#nav-shared-with-me"
              role="tab"
              aria-controls="nav-shared-with-me"
              aria-selected="false"
            >
              Shared With Me
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-my-todoes"
            role="tabpanel"
            aria-labelledby="nav-my-todoes-tab"
          >
            <Query query={GET_ALL_TODOES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return (
                  <div>
                    {data.readAllToDoes.length === 0 && (
                      <p>You have no ToDo now</p>
                    )}
                    {data.readAllToDoes && (
                      <div className="list-group">
                        {data.readAllToDoes.map(item => (
                          <ToDo item={item} key={item.id} own={true} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            </Query>
          </div>
          <div
            className="tab-pane fade"
            id="nav-shared-with-me"
            role="tabpanel"
            aria-labelledby="nav-shared-with-me-tab"
          >
            <Query query={GET_ALL_TODOES_SHARED_WITH_ME}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return (
                  <div>
                    {data.readAllToDoesSharedWithMe.length === 0 && (
                      <p>You have no ToDo to collaborate</p>
                    )}
                    {data.readAllToDoesSharedWithMe && (
                      <div className="list-group">
                        {data.readAllToDoesSharedWithMe.map(item => (
                          <ToDo item={item} key={item.id} own={false} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default List;
