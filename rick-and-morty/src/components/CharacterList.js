
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = ({ searchQuery }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Row>
        {filteredCharacters.map((character) => (
          <Col key={character.id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={character.image} />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>Species: {character.species}</Card.Text>
                <Card.Text>Status: {character.status}</Card.Text>
                <Link to={`/character/${character.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        {[...Array(totalPages).keys()].map((pageIndex) => (
          <Pagination.Item
            key={pageIndex + 1}
            active={pageIndex + 1 === page}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default CharacterList;
