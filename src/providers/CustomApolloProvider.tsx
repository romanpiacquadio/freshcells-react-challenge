import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql',
  cache: new InMemoryCache(),
});

interface CustomApolloProviderProps {
  children: ReactNode;
}

const CustomApolloProvider: React.FC<CustomApolloProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default CustomApolloProvider;