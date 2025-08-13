import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Alert, Box, Typography } from '@mui/material';
import usePaymentApi from '../hooks/usePaymentApi';

const currencies = ['USD', 'EUR', 'INR'];
const paymentMethods = [
  { value: 'card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank', label: 'Bank Transfer' },
];

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('card');
  const [transactionId, setTransactionId] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  const { loading, error, data, makePayment, refundPayment, getPaymentStatus } = usePaymentApi();
  const [success, setSuccess] = useState(null);

  // Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    const paymentData = {
      amount: parseFloat(amount),
      currency,
      source: method,
    };
    const result = await makePayment(paymentData);
    if (result) {
      setSuccess(`Payment successful! Transaction ID: ${result.transactionId}, Status: ${result.status}`);
      setTransactionId(result.transactionId);
    }
  };

  // Handle check status
  const handleCheckStatus = async () => {
    setSuccess(null);
    if (!transactionId) return;
    const result = await getPaymentStatus(transactionId);
    if (result) {
      setSuccess(`Status: ${result.status}, Amount: ${result.amount} ${result.currency}`);
    }
  };

  // Handle refund
  const handleRefund = async () => {
    setSuccess(null);
    if (!transactionId || !refundAmount) return;
    const refundData = {
      transactionId,
      amount: parseFloat(refundAmount),
    };
    const result = await refundPayment(refundData);
    if (result) {
      setSuccess(`Refund successful! Refund ID: ${result.refundId}, Status: ${result.status}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 2, borderRadius: 2, bgcolor: '#fafafa' }}>
      <Typography variant="h5" gutterBottom>Payment Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          fullWidth
          margin="normal"
        >
          {currencies.map(cur => (
            <MenuItem key={cur} value={cur}>{cur}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Payment Method"
          value={method}
          onChange={e => setMethod(e.target.value)}
          fullWidth
          margin="normal"
        >
          {paymentMethods.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Make Payment'}
          </Button>
        </Box>
      </form>
      <Box sx={{ mt: 3 }}>
        <TextField
          label="Transaction ID"
          value={transactionId}
          onChange={e => setTransactionId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="outlined" color="info" onClick={handleCheckStatus} disabled={loading || !transactionId} sx={{ mr: 2 }}>
          {loading ? <CircularProgress size={20} /> : 'Check Status'}
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Refund Amount"
          type="number"
          value={refundAmount}
          onChange={e => setRefundAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="outlined" color="secondary" onClick={handleRefund} disabled={loading || !transactionId || !refundAmount}>
          {loading ? <CircularProgress size={20} /> : 'Refund Payment'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message || 'Payment error'}</Alert>}
      {data && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Response:</Typography>
          <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

export default PaymentForm;
