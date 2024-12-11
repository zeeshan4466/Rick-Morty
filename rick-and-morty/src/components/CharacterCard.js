// src/components/CharacterCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Card, CardContent, Typography, Button } from '@mui/material';

const CharacterCard = ({ character }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate(`/character/${character.id}`); // Navigate to the character detail page
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{character.name}</Typography>
        <Typography variant="body2">Species: {character.species}</Typography>
        <Typography variant="body2">Status: {character.status}</Typography>

        <Button onClick={handleClick} variant="contained" color="primary">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
