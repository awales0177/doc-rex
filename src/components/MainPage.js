import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css'; // Assuming you have styles for the main page

function MainPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Welcome to MetaKnot</h1>
        <p>Tying together metadata in a seamless catalog</p>
      </header>

      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          <h2>Data Models</h2>
          <p> >> Explore our powerful data models, designed for your analytical needs.</p>
          <Link to="/data-models" className={styles.cardLink}>Explore Data Models</Link>
        </div>
        <div className={styles.featureCard}>
          <h2>Datasets</h2>
          <p> >> Browse datasets and discover associated data products.</p>
          <Link to="/data-set" className={styles.cardLink}>Explore Modeled Datasets</Link>
        </div>
        <div className={styles.featureCard}>
          <h2>Contracts</h2>
          <p> >> View our data agreements with our downstream customers.</p>
          <Link to="/data-contracts" className={styles.cardLink}>Explore Contracts</Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
