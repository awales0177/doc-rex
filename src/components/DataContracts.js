import React, { useState, useEffect } from 'react';
import styles from './DataModelCards.module.css';

function DataContracts() {
  const [contracts, setContracts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContracts, setFilteredContracts] = useState([]);

  useEffect(() => {
    fetch('/contracts.json')
      .then((response) => response.json())
      .then((data) => {
        setContracts(data);
        setFilteredContracts(data); // Initialize filteredContracts with all data
      });
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = contracts.filter(
      (contract) =>
        contract.name.toLowerCase().includes(lowercasedQuery) ||
        contract.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredContracts(filtered);
  }, [searchQuery, contracts]);

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search all contracts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.cardContainer}>
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract, index) => (
            <div key={index} className={styles.card}>
              <h3>{contract.name}</h3>
              <p>{contract.description}</p>
              <a href={contract.link} target="_blank" rel="noopener noreferrer">
                View Contract
              </a>
            </div>
          ))
        ) : (
          <p>No contracts found.</p>
        )}
      </div>
    </div>
  );
}

export default DataContracts;
