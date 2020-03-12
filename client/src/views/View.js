import React, { useState, useEffect, useContext, useCallback } from 'react';

// Shopify Polaris
import { Card, Page, TextField } from '@shopify/polaris';

// Context
import { StoreContext } from '../context/StoreContext';

export default function View(props) {
  const { makeRequest } = useContext(StoreContext);

  const [customer, setCustomer] = useState({
    name: undefined,
    _id: undefined,
    points: undefined
  });

  const handleChange = (value) => {
    setCustomer({ ...customer, points: value });
  };
  const handleSubmit = () => {
    makeRequest('put', `/api/customers/${customer._id}`, {
      points: customer.points
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    makeRequest('get', `/api/customers/${props.match.params._id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Page
      full-width
      title={customer.name}
      breadcrumbs={[{ content: 'Back', url: '/' }]}
      primaryAction={{
        content: 'Save',
        onClick: handleSubmit
      }}
    >
      <Card sectioned>
        {customer.points && (
          <TextField
            type='number'
            label='Customer Points'
            value={customer.points.toString()}
            onChange={handleChange}
          />
        )}
      </Card>
    </Page>
  );
}
