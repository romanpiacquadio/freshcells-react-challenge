import { useRouteError } from "react-router-dom";
import { Typography } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Oops!</Typography>
      <Typography variant="body1">Page not found.</Typography>
    </div>
  );
}