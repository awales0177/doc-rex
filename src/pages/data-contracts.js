// src/pages/data-contracts.js
import React from 'react';
import Layout from '@theme/Layout';
import DataContracts from '../components/DataContracts';  // Adjust path if needed

function DataContractsPage() {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>  Data Contracts</h1>
        <DataContracts />
      </div>
    </Layout>
  );
}

export default DataContractsPage;