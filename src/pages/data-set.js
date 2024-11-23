// src/pages/data-contracts.js
import React from 'react';
import Layout from '@theme/Layout';
import DataSetsCards from '../components/DataSetsCards';  // Adjust path if needed

function DataSetsPage() {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>  DataSets 🔥 </h1>
        <DataSetsCards />
      </div>
    </Layout>
  );
}

export default DataSetsPage;