import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/articles')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCreateArticle = () => {
    // Create a new article through the API
    axios.post('http://localhost:3001/articles', { title, content })
      .then(response => {
        setArticles([...articles, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => console.error('Error creating article:', error));
  };

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
      <h2>Create New Article</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreateArticle}>Create</button>
    </div>
  );
};

export default Articles;
