import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css'; // Assuming you have styles for the main page

function MainPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Welcome to metaKnot 🪢 </h1>
        <p>Tying together Metadata Regarding Data Models, Datasets, and Contracts in a Seamless Catalog</p>
      </header>

      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          <h2>Data Models</h2>
          <p>Explore our powerful data models, designed for your analytical needs.</p>
          <Link to="/data-models" className={styles.cardLink}>Explore Data Models</Link>
        </div>
        <div className={styles.featureCard}>
          <h2>Datasets</h2>
          <p>Browse datasets and understand how they power our data models.</p>
          <Link to="/data-set" className={styles.cardLink}>Explore Modeled Datasets</Link>
        </div>
        <div className={styles.featureCard}>
          <h2>Contracts</h2>
          <p>View contracts related to data models and datasets.</p>
          <Link to="/data-contracts" className={styles.cardLink}>Explore Contracts</Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
