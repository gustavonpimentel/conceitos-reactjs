import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories(){
      const response = await api.get('repositories');

      setRepositories(response.data);
    }
    
    loadRepositories();
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Teste",
      url: "http://localhost",
      techs: [
        'React', 
        'Nodejs'
      ]
    });

    const respository = response.data;

    setRepositories([...repositories, respository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204){
      setRepositories(repositories.filter(repo => repo.id !== id))
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
