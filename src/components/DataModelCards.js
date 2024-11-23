import React, { useState, useEffect } from 'react';
import styles from './DataModelCards.module.css';
import styles2 from './DataModelDetail.module.css';

function DataModelCards() {
  const [models, setModels] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  // Fetch data models from the JSON file
  useEffect(() => {
    fetch('/dataModels.json')
      .then((response) => response.json())
      .then((data) => {
        setModels(data);
        setFilteredModels(data); // Initialize filteredModels with all data
      });
  }, []);

  // Fetch contracts from the separate JSON file
  useEffect(() => {
    fetch('/contracts.json')
      .then((response) => response.json())
      .then((data) => setContracts(data));
  }, []);

  // Update filtered models when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = models.filter(
      (model) =>
        model.name.toLowerCase().includes(lowercasedQuery) ||
        model.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredModels(filtered);
  }, [searchQuery, models]);

  // Handle card click to display the detailed view
  const handleCardClick = (model) => {
    setSelectedModel(model);
  };

  // Handle back to the list view
  const handleBackClick = () => {
    setSelectedModel(null);
  };

  // Get contracts for the selected model
  const getContractsForModel = (modelName) => {
    return contracts.filter((contract) => contract.modelName === modelName);
  };

  return (
    <div>
      {selectedModel ? (
        <div className={styles2.detailContainer}>
          <div className={styles2.detailTopBox}>
            <h1>{selectedModel.name}</h1>
            <p>
              <strong>Description:</strong> {selectedModel.description}
            </p>
            <p>
              <strong>Owner:</strong> {selectedModel.owner}
            </p>
            <p>
              <strong>Version:</strong> {selectedModel.version}
            </p>
            <p>
              <strong>Created At:</strong> {selectedModel.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {selectedModel.updatedAt}
            </p>
            <p>
              <strong>Expiration Date:</strong> {selectedModel.expirationDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedModel.status}
            </p>
            <p>
              <strong>Documentation:</strong>{' '}
              <a
                href={selectedModel.documentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </p>
            <button
              onClick={handleBackClick}
              className={styles2.backButton}
            >
              Back to Data Models
            </button>
          </div>

          {/* Contracts Section */}
          <h2>Contracts</h2>
          <div className={styles2.contractContainer}>
            {getContractsForModel(selectedModel.name).map((contract, index) => (
              <div key={index} className={styles2.contractCard}>
                <h3>{contract.name}</h3>
                <p>{contract.description}</p>
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
              placeholder="Search data models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Display filtered models as cards */}
          <div className={styles.cardContainer}>
            {filteredModels.map((model, index) => {
              // Get the number of contracts for the model
              const modelContracts = getContractsForModel(model.name);
              return (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => handleCardClick(model)}
                >
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>


                  {/* Emoji and contract count at the bottom-right corner */}
                  <div className={styles.contractCount}>
                    <span role="img" aria-label="contracts">
                      🤝 {modelContracts.length} Contracts

                    {/* Display transformed datasets count */}
                    <div className={styles.contractCount}>
                    <span role="img" aria-label="datasets">
                    🔥 {model.transformedDatasetsCount} Datasets
                    </span>
                  </div>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataModelCards;
