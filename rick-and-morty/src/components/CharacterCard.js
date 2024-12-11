import React from 'react';
import { Card, CardContent, CardMedia, Typography, Badge, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/character/${character.id}`);
  };

  return (
    <Card onClick={handleClick} sx={{ maxWidth: 345, cursor: 'pointer' }}>
      <CardMedia
        component="img"
        alt={character.name}
        height="140"
        image={character.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: {character.species}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: <Badge color={character.status === 'Alive' ? 'success' : 'error'}>{character.status}</Badge>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
