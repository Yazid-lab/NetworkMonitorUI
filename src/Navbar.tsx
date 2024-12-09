import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoOnt from './assets/logo-v4.gif'; // Update this with the actual logo path

interface NavbarProps {
  deviceName?: string; // Optional prop for device name
}

const Navbar: React.FC<NavbarProps> = ({ deviceName }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  // Check if the user is authenticated and retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    // Clear the authentication tokens and user information
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleHomeClick}
            sx={{ mr: 2 }}
          >
            <Avatar variant="square" src={LogoOnt} sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" color="black">
              Home
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" component="div" color="black">
              {deviceName}
            </Typography>
          </Box>
          <Box>
            {/* Show username and logout button if user is logged in */}
            {username ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="black" sx={{ mr: 2 }}>
                  Welcome, {username}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
