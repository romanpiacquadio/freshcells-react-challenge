import React from 'react';
import { Box, Alert } from '@mui/material';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error">Error: {message}</Alert>
    </Box>
  );
};

export default ErrorComponent;