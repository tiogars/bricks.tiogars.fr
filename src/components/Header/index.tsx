import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeSelector } from '../ThemeSelector';

export function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ flexDirection: 'column', py: 2, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'white' }}>
              <span role="img" aria-label="brick">🧱</span> Brick Manager
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Manage your favorite brick numbers with style!
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              textAlign: 'center',
              maxWidth: '600px'
            }}
          >
            ⚠️ Data stored in browser - Export regularly to prevent data loss
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ThemeSelector />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
