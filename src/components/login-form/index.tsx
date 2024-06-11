import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { gql, useMutation } from '@apollo/client';
import { NavigateFunction } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import validateEmail from '../../helpers/validateEmail';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;

const LoginForm: React.FC<{ navigate: NavigateFunction }> = ({navigate}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      navigate('/account');
    }
  }, [cookies, navigate]);
  
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    },
    onCompleted: (data) => {
      if (data && data.login.jwt) {
        const token = data.login.jwt;

        setCookie('token', token, { path: '/', secure: true, sameSite: 'strict' });
        navigate('/account');
      }
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      return setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    if (!password) {
      setErrorMessage("Please enter a password");
      return setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    await login({ variables: { email, password } });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: '50px', minWidth: '120px' }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
        {errorMessage.length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
