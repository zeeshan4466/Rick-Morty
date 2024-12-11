// src/components/CharacterList.js
import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box, Typography, Grid2 } from '@mui/material';
import { getCharacters } from '../api';
import CharacterCard from './CharacterCard';
import Pagination from './Pagination';

const CharacterList = ({ searchQuery }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // This is the missing part, setting up the page state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacters(page, searchQuery); // Use page here for pagination
        setCharacters(data.results);
      } catch (err) {
        setError('Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]); // Re-fetch data when searchQuery or page changes

  if (loading) return <CircularProgress />;
  if (error) return <Box><Typography>{error}</Typography></Box>;

  return (
    <Box>
      <Grid2 container spacing={2}>
        {characters.map(character => (
          <Grid2 item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard character={character} />
          </Grid2>
        ))}
      </Grid2>
      <Pagination page={page} onPageChange={(newPage) => setPage(newPage)} /> {/* Pass setPage */}
    </Box>
  );
};

export default CharacterList;
