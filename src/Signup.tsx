import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import LogoOnt from './assets/logo_ont_text.png';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to handle error messages
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!email || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send POST request to signup endpoint
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        email,
        username,
        password,
      });

      // On successful signup, redirect to the login page
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.'); // Handle signup error
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
        Sign Up
      </Typography>

      {/* Wrap the form inputs and button in a form element */}
      <Box
        component="form" // This makes it a form
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleSignup} // Trigger handleSignup on form submission
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          size="medium"
          sx={{ mb: 3 }}
        />
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
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit" // Change onClick to type="submit" for form submission
          sx={{ mt: 3, width: '100%' }}
        >
          Sign Up
        </Button>

        {/* Link to login page */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
