import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          <Link
            href="https://github.com/tiogars/noob-bricks"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ mr: 1 }}
          >
            🔗 GitHub Repository
          </Link>
          {' • '}
          <Link
            href="https://github.com/tiogars/noob-bricks/issues"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ ml: 1 }}
          >
            🐛 Report an Issue
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
