import React, { useState, useEffect } from 'react';
import styles from './DataModelCards.module.css';  // Reusing the same styles as DataModelCards
import styles2 from './DataModelDetail.module.css';

function DataContracts() {
  const [contracts, setContracts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  // Fetch contracts from the JSON file
  useEffect(() => {
    fetch('/contracts.json')
      .then((response) => response.json())
      .then((data) => {
        setContracts(data);
        setFilteredContracts(data); // Initialize filteredContracts with all data
      });
  }, []);

  // Filter contracts based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = contracts.filter(
      (contract) =>
        contract.name.toLowerCase().includes(lowercasedQuery) ||
        contract.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredContracts(filtered);
  }, [searchQuery, contracts]);

  // Handle card click to display the detailed view
  const handleCardClick = (contract) => {
    setSelectedContract(contract);
  };

  // Handle back to the list view
  const handleBackClick = () => {
    setSelectedContract(null);
  };

  return (
    <div>
      {selectedContract ? (
        <div className={styles2.detailContainer}>
          <div className={styles2.detailTopBox}>
            <h1>{selectedContract.name}</h1>
            <p>
              <strong>Description:</strong> {selectedContract.description}
            </p>
            <button
              onClick={handleBackClick}
              className={styles2.backButton}
            >
              Back to Contracts
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search all contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Display filtered contracts as cards */}
          <div className={styles.cardContainer}>
            {filteredContracts.length > 0 ? (
              filteredContracts.map((contract, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => handleCardClick(contract)}
                >
                  <h3>{contract.name}</h3>
                  <p>{contract.description}</p>
                </div>
              ))
            ) : (
              <p>No contracts found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataContracts;
