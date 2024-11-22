import React, { useState, useEffect } from 'react';
import styles from './DataModelCards.module.css';
import styles2 from './DataModelDetail.module.css';


function DataModelCards() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null); // Store selected model

  // Fetch data models from the JSON file
  useEffect(() => {
    fetch('/dataModels.json')
      .then(response => response.json())
      .then(data => {
        setModels(data);
        setFilteredModels(data); // Initialize filteredModels with all data
      });
  }, []);

  // Update filtered models when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = models.filter(model =>
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

  return (
    <div>
      {/* Show either the search + card list or the detailed view */}
      {selectedModel ? (
        <div className={styles2.detailContainer}>
          <h1>{selectedModel.name}</h1>
          <p><strong>Description:</strong> {selectedModel.description}</p>
          <p><strong>Owner:</strong> {selectedModel.owner}</p>
          <p><strong>Version:</strong> {selectedModel.version}</p>
          <p><strong>Created At:</strong> {selectedModel.createdAt}</p>
          <p><strong>Updated At:</strong> {selectedModel.updatedAt}</p>
          <p><strong>Expiration Date:</strong> {selectedModel.expirationDate}</p>
          <p><strong>Status:</strong> {selectedModel.status}</p>
          <p><strong>Documentation:</strong> 
          <a href={selectedModel.Documentation}target="_blank" rel="noopener noreferrer">View Documentation</a></p>

          <button onClick={handleBackClick} className={styles2.backButton}>Back to Data Models</button>
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
            {filteredModels.map((model, index) => (
              <div key={index} className={styles.card} onClick={() => handleCardClick(model)}>
                <h3>{model.name}</h3>
                <p>{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataModelCards;
