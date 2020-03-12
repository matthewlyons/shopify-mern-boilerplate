import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

// Views
import Customers from './views/Customers';
import View from './views/View';

function App() {
  return (
    <MemoryRouter>
      <Route exact path='/' component={Customers} />
      <Route exact path='/:_id' render={(props) => <View {...props} />} />
    </MemoryRouter>
  );
}

export default App;
