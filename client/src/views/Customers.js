import React, { useEffect, useState, useContext } from 'react';

// Shopify Polaris
import { Page, Layout, ResourceList, TextStyle, Card } from '@shopify/polaris';

// React Context
import { StoreContext } from '../context/StoreContext';

export default function Customers() {
  const { makeRequest } = useContext(StoreContext);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    makeRequest('get', '/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page full-width title='Customers'>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={customers}
              renderItem={(item) => {
                const { name, points, _id } = item;
                const url = '/' + _id;
                return (
                  <ResourceList.Item
                    actions={[{ content: 'Add variant' }]}
                    id={_id}
                    url={url}
                  >
                    <h3>
                      <TextStyle variation='strong'>{name}</TextStyle>
                    </h3>
                    <div>{points} Loyalty Points</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
