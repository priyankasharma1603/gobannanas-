// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchPosts } from './api';
import './App.css'
import { Container, Typography, TextField, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {filteredPosts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.body} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default App;
