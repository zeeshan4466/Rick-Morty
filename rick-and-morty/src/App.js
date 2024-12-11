// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography, TextField } from '@mui/material';
import CharacterDetail from './pages/CharacterDetail';
import Home from './Pages/Home';

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
          <Switch>
            <Route exact path="/">
              {/* Home Page with search */}
              <TextField
                label="Search characters"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 3, mt: 3 }}
              />
              <Home searchQuery={searchQuery} />
            </Route>

            <Route path="/character/:id">
              {/* Character Detail Page */}
              <CharacterDetail />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
