import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { getCharacterDetail } from '../api'; // API call utility to fetch character details

const CharacterDetail = () => {
  const { id } = useParams(); // Get the character ID from the URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacterDetail(id);
        setCharacter(data);
      } catch (err) {
        setError('Failed to fetch character details');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">{character.name}</Typography>
      <Typography variant="h6">Species: {character.species}</Typography>
      <Typography variant="h6">Status: {character.status}</Typography>
      <Typography variant="h6">Gender: {character.gender}</Typography>
      <Typography variant="h6">Origin: {character.origin.name}</Typography>
      <Typography variant="h6">Location: {character.location.name}</Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Appeared in episodes:</Typography>
        <ul>
          {character.episode.map((episode, index) => (
            <li key={index}>
              <Typography variant="body1">{episode}</Typography>
            </li>
          ))}
        </ul>
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => window.history.back()}>
        Back to Character List
      </Button>
    </Box>
  );
};

export default CharacterDetail;
