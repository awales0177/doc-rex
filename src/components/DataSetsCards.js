import React, { useState, useEffect } from 'react';
import styles from './DataModelCards.module.css';
import styles2 from './DataModelDetail.module.css';

function DataSetsCards() {
  const [datasets, setDatasets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);

  // Fetch datasets from the JSON file
  useEffect(() => {
    fetch('/datasets.json')
      .then((response) => response.json())
      .then((data) => {
        setDatasets(data);
        setFilteredDatasets(data); // Initialize filtered datasets with all data
      });
  }, []);

  // Update filtered datasets when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = datasets.filter(
      (dataset) =>
        dataset.name.toLowerCase().includes(lowercasedQuery) ||
        dataset.metadata.link.toLowerCase().includes(lowercasedQuery) ||
        dataset.metadata.s3_location.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDatasets(filtered);
  }, [searchQuery, datasets]);

  // Handle card click to display the detailed view
  const handleCardClick = (dataset) => {
    setSelectedDataset(dataset);
  };

  // Handle closing the detail view
  const handleBackClick = () => {
    setSelectedDataset(null);
  };

  return (
    <div>
      {selectedDataset ? (
        <div className={styles2.detailContainer}>
          <div className={styles2.detailTopBox}>
            {/* X Button for closing the detail view */}
            <button
              onClick={handleBackClick}
              className={styles2.closeButton}
            >
              X
            </button>
            <h1>{selectedDataset.name}</h1>
            <p>
              <strong>Description:</strong> {selectedDataset.metadata.description}
            </p>
            <p>
              <strong>Date Received:</strong> {selectedDataset.metadata.date_received}
            </p>
            <p>
              <strong>UUID:</strong> {selectedDataset.metadata.UUID}
            </p>
            <p>
              <strong>Link:</strong>{' '}
              <a
                href={selectedDataset.metadata.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedDataset.metadata.link}
              </a>
            </p>
            <p>
              <strong>S3 Location:</strong>{' '}
                {selectedDataset.metadata.s3_location}
            </p>
            <p>
              <strong>Size:</strong> {selectedDataset.metadata.size}
            </p>
            <p>
              <strong>Data Type:</strong> {selectedDataset.metadata.data_type}
            </p>
            <p>
              <strong>Tags:</strong> {selectedDataset.metadata.tags.join(', ')}
            </p>
            <p>
              <strong>Created By:</strong> {selectedDataset.metadata.createdBy}
            </p>
          </div>

          {/* Models Section */}
          <h2>Data Models ({selectedDataset.metadata.transformedToModels.length})</h2>
          <div className={styles2.contractContainer}>
            {selectedDataset.metadata.transformedToModels.map((model, index) => (
              <div key={index} className={styles2.contractCard}>
                <h3>{model}</h3>
                <p>Description of {model} goes here.</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Display filtered datasets as cards */}
          <div className={styles.cardContainer}>
            {filteredDatasets.map((dataset, index) => {
              const datasetModels = dataset.metadata.transformedToModels;
              return (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => handleCardClick(dataset)}
                >
                  <h3>{dataset.name}</h3>
                  <p>{dataset.metadata.description}</p>
                  <p> 🪢 {datasetModels.length} Models</p> {/* Display number of data models */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataSetsCards;
