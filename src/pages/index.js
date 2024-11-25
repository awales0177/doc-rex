import React from 'react';
import Layout from '@theme/Layout';
import MainPage from '../components/MainPage';

function Home() {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <MainPage />
      </div>
    </Layout>
  );
}

export default Home;