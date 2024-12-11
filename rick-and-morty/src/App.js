// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography, TextField } from '@mui/material';
import Home from './Pages/Home';
import CharacterDetail from './Pages/CharacterDetail';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
    <div>
      {/* App Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Rick and Morty Character Explorer</Typography>
        </Toolbar>
      </AppBar>

      <CssBaseline />
      
      {/* Main Content */}
      <Container>
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} /> {/* Home Page with search */}
          <Route path="/character/:id" element={<CharacterDetail />} /> {/* Character Detail Page */}
        </Routes>
      </Container>
    </div>
  </Router>
  );
}

export default App;
