import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, Button } from '@mui/material';
import { updateUserSubscription } from '../../../store/user';
import { useTheme } from '@mui/material/styles';

const SubscriptionModal = ({ open, onClose, currentUser }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const handleSubscribe = () => {
    dispatch(updateUserSubscription({ userId: currentUser.id , subscribed: true }));
    onClose();
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="subscription-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        [theme.breakpoints.up('desktop')]: {
          width: 400,
          left: '50%',
        }
      }}>
        <Typography id="subscription-modal-title" variant="h5" component="h1" gutterBottom>
          Subscribe to our Newsletter!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, mt: 3 }}>
          Would you like to subscribe to stay up to date?
        </Typography>
        <Typography variant="caption">
          By subscribing you'll receive newsletters featuring exclusive promotions, updates, and events. The Turn will use your email address only for sending these communications. You can unsubscribe at any time using the link in any email. For more information on how we handle your data, please see our Privacy Policy.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 5 }}>
          <Button onClick={onClose} color="inherit">Not Now</Button>
          <Button onClick={handleSubscribe} variant="contained" color="primary">
            Subscribe
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;