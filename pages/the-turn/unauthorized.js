import Link from 'next/link';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

export default function Unauthorized() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ bgcolor: '#f5f5f5' }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 500, 
          width: '100%', 
          textAlign: 'center' 
        }}
      >
        <ErrorOutline sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" paragraph>
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </Typography>
        <Button 
          component={Link} 
          href="/" 
          variant="contained" 
          color="primary"
        >
          Return to Homepage
        </Button>
      </Paper>
    </Box>
  );
}