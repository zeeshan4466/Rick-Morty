// src/pages/CharacterDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (err) {
        setError('Failed to fetch character details');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterDetail();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={character.image} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>Species: {character.species}</Card.Text>
          <Card.Text>Status: {character.status}</Card.Text>
          <Card.Text>Gender: {character.gender}</Card.Text>
          <Card.Text>Origin: {character.origin.name}</Card.Text>
          <Card.Text>Location: {character.location.name}</Card.Text>
          <Button variant="primary" onClick={() => window.history.back()}>Back to List</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CharacterDetail;
