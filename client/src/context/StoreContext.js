import React, { createContext, useReducer } from 'react';
import { reducer, initialState, types } from './reducers';

import axios from 'axios';

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = useReducer(reducer, initialState);

  async function makeRequest(method, route, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: route,
        headers: {
          Authorization: 'Bearer ' + state.authToken
        },
        data
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    });
  }

  return (
    <StoreContext.Provider value={{ state, dispatch, makeRequest }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
