import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import PaymentForm from '../components/PaymentForm';

function PaymentDemo() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom>Payment API Demo</Typography>
            <Typography variant="body1" color="text.secondary">
              This demo showcases integration with a 3rd-party payment API. You can process payments, check status, and request refunds using the form below.
            </Typography>
          </Box>
          <PaymentForm />
        </CardContent>
      </Card>
    </Container>
  );
}

export default PaymentDemo;
