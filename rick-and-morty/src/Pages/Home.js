import React, { useState } from 'react';
import { Container, TextField, Box } from '@mui/material';
import CharacterList from '../components/CharacterList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  return (
    <Container>
      <TextField
        label="Search characters"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      <CharacterList searchQuery={searchQuery} page={page} />
    </Container>
  );
};

export default Home;
