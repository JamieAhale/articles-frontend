import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';

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
    axios.post('http://localhost:3001/articles', { title, content })
      .then(response => {
        setArticles([...articles, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => console.error('Error creating article:', error));
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Articles</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <ListGroup>
            {articles.map(article => (
              <ListGroup.Item key={article.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.content}</Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow">
            <h2 className="text-center mb-4">Create New Article</h2>
            <Form>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formContent" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleCreateArticle} block>
                Create
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Articles;

