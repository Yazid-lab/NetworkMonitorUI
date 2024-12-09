import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoOnt from './assets/logo_ont_text.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // For error handling
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          username,
          password,
        }
      );
      const { authenticationToken, refreshToken, expiresAt, username: returnedUsername } = response.data;

      // Store tokens in localStorage/sessionStorage
      localStorage.setItem('authenticationToken', authenticationToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expiresAt', expiresAt);
      localStorage.setItem('username', returnedUsername);

      // Navigate to home after successful login
      navigate('/home');
    } catch (error) {
      if (error.response) {
        // If the server responded with a status code outside the 2xx range
        console.error('Login failed:', error.response.data);
        setError('Invalid username or password');
      } else if (error.request) {
        // If no response was received from the server
        console.error('Server did not respond:', error.request);
        setError('Server is not responding. Please try again later.');
      } else {
        // Some other error occurred
        console.error('Error occurred during login:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box sx={{ mb: 3 }}>
        <img src={LogoOnt} alt="Logo" />
      </Box>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Wrap the inputs and button in a form */}
      <Box
        component="form" // This makes it a form
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleLogin} // Trigger login on form submission
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          size="medium"
          sx={{ mb: 3 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          size="medium"
          sx={{ mb: 3 }}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit" // Change onClick to type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: '100%', py:1.5 }}
        >
          Login
        </Button>

        {/* Signup link below input fields */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
