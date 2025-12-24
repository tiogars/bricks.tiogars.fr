import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import { useState } from 'react';
import { brickService } from '../../models/brickService';
import type { PrintViewProps } from './PrintView.types';

export function PrintView({ bricks, selectedTags, onClose }: PrintViewProps) {
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const sortedBricks = brickService.sortByNumber(bricks);

  const handlePrint = () => {
    window.print();
  };

  const handleImageLoad = (brickId: string) => {
    setImageLoading(prev => ({ ...prev, [brickId]: false }));
  };

  const handleImageError = (brickId: string) => {
    setImageLoadError(prev => ({ ...prev, [brickId]: true }));
    setImageLoading(prev => ({ ...prev, [brickId]: false }));
  };

  return (
    <Box>
      <Box
        sx={{
          '@media print': {
            display: 'none',
          },
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            🧱 Brick Manager
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Brick List
          </Typography>
          {selectedTags.length > 0 && (
            <Typography variant="body1" color="text.secondary">
              Filtered by tags: <strong>{selectedTags.join(', ')}</strong>
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Generated: {new Date().toLocaleString()}
          </Typography>
        </Box>

        {sortedBricks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No bricks to display.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Number</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Tags</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedBricks.map((brick) => (
                    <TableRow key={brick.id} hover>
                      <TableCell sx={{ width: 100 }}>
                        {brick.imageUrl ? (
                          <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                            {(imageLoading[brick.id] !== false) && !imageLoadError[brick.id] && (
                              <Skeleton variant="rectangular" width={80} height={80} />
                            )}
                            {!imageLoadError[brick.id] && (
                              <img
                                src={brick.imageUrl}
                                alt={`Brick ${brick.number}`}
                                onLoad={() => handleImageLoad(brick.id)}
                                onError={() => handleImageError(brick.id)}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  display: imageLoading[brick.id] === false ? 'block' : 'none',
                                }}
                              />
                            )}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                            }}
                          >
                            <Typography sx={{ fontSize: '2rem', opacity: 0.3 }}>🧱</Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{brick.number}</TableCell>
                      <TableCell>{brick.title || '-'}</TableCell>
                      <TableCell>
                        {brick.tags.length > 0 ? brick.tags.join(', ') : '-'}
                      </TableCell>
                      <TableCell>{new Date(brick.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Total bricks: {sortedBricks.length}
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
