import React from 'react';
import { useCookies } from 'react-cookie';
import { gql, useQuery } from '@apollo/client';
import ErrorComponent from '../../components/error';
import LoadingSpinner from '../../components/loading-spinner';
import AccountCard from '../../components/account-card';

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

const AccountPage: React.FC = () => {
  const [cookies, , removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
  };

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: 2 },
    context: {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    },
    skip: !`Bearer ${cookies.token}`,
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <AccountCard userData={data} onLogout={handleLogout}/>
  );
};

export default AccountPage;