import React from 'react';
import Layout from '@theme/Layout';
import DataModelCards from '../components/DataModelCards';

function Home() {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>DataModels 🪢   </h1>
        <DataModelCards />
      </div>
    </Layout>
  );
}

export default Home;