// src/pages/Home.js
import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import CharacterList from '../components/CharacterList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container className="my-4">
      <h1>Rick and Morty Character Explorer</h1>
      <Form.Control
        type="text"
        placeholder="Search characters"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <CharacterList searchQuery={searchQuery} />
    </Container>
  );
};

export default Home;
