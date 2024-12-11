import React, { useEffect, useState } from 'react';
import {  CircularProgress, Box, Typography, Grid2 } from '@mui/material';
import { getCharacters } from '../api';
import CharacterCard from './CharacterCard';
import Pagination from './Pagination';

const CharacterList = ({ searchQuery, page }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacters(page, searchQuery);
        setCharacters(data.results);
      } catch (err) {
        setError('Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  if (loading) return <CircularProgress />;
  if (error) return <Box><Typography>{error}</Typography></Box>;

  return (
    <Box>
      <Grid2 container spacing={2}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid2>
      <Pagination page={page} onPageChange={(newPage) => setPage(newPage)} />
    </Box>
  );
};

export default CharacterList;
