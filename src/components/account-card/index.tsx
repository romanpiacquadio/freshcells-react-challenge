import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

interface AccountCardProps {
  userData: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  onLogout: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ userData, onLogout }) => {

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Account Page
          </Typography>
          {userData && (
            <Box>
              <Typography variant="body1"><strong>ID:</strong> {userData.id}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
              <Typography variant="body1"><strong>First Name:</strong> {userData.firstName}</Typography>
              <Typography variant="body1"><strong>Last Name:</strong> {userData.lastName}</Typography>
            </Box>
          )}
          <Button
            onClick={onLogout}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountCard;
