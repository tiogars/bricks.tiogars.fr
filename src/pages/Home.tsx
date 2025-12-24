import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useBricks } from '../hooks/useBricks';
import { Header } from '../components/Header';
import { BrickForm } from '../components/BrickForm';
import { BrickList } from '../components/BrickList';
import { TagFilter } from '../components/TagFilter';
import { ImportExport } from '../components/ImportExport';
import { Footer } from '../components/Footer';
import type { Brick } from '../types';

export function Home() {
  const navigate = useNavigate();
  const { bricks, tags, addBrick, updateBrick, deleteBrick, importBricks, clearAllBricks } = useBricks();
  const [editingBrick, setEditingBrick] = useState<Brick | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleEdit = (brick: Brick) => {
    setEditingBrick(brick);
  };

  const handleCancelEdit = () => {
    setEditingBrick(null);
  };

  const handleFormSubmit = (formData: { number: string; title?: string; tags: string[] }) => {
    if (editingBrick) {
      updateBrick(editingBrick.id, formData);
      setEditingBrick(null);
    } else {
      addBrick(formData);
    }
  };

  const filteredBricks = selectedTags.length > 0
    ? bricks.filter((brick) => selectedTags.some((tag) => brick.tags.includes(tag)))
    : bricks;

  const handlePrint = () => {
    navigate('/print', { state: { bricks: filteredBricks, selectedTags } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          <Box>
            <BrickForm
              key={editingBrick?.id || 'new'}
              onSubmit={handleFormSubmit}
              editingBrick={editingBrick}
              onCancel={handleCancelEdit}
              existingTags={tags}
            />
            
            <ImportExport
              bricks={bricks}
              onImport={importBricks}
              onClearAll={clearAllBricks}
            />
          </Box>

          <Box>
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              onPrint={handlePrint}
            />

            <BrickList
              bricks={filteredBricks}
              onEdit={handleEdit}
              onDelete={deleteBrick}
            />
          </Box>
        </Box>
      </Container>
      
      <Footer />
    </Box>
  );
}
