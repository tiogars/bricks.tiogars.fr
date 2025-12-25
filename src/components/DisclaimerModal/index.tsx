import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ open, onClose }: DisclaimerModalProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <WarningAmberIcon color="warning" />
        <Typography variant="h6" component="span">
          Important Information
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            ⚠️ Data Storage Policy
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Please be aware of the following important information about your data:
          </Typography>
          
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              📦 <strong>Local Storage:</strong> All your data is stored locally in your browser's localStorage.
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              ⚠️ <strong>Data Loss Risk:</strong> Your data may be lost if you clear browser data, use private/incognito mode, or switch browsers.
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              💾 <strong>Backup Required:</strong> To preserve your data, you must export your brick collection regularly and import it when needed to restore.
            </Typography>
          </Box>
          
          <Typography variant="body2" sx={{ mt: 1, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <strong>Tip:</strong> Use the Import/Export feature (accessible via the floating button) to backup and restore your data.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
          }}
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}
