import { useState, useCallback } from "react";
import paymentService from "../services/paymentService";

/**
 * usePaymentApi React hook
 * Manages payment API calls and state
 */
function usePaymentApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Make a payment
  const makePayment = useCallback(async (paymentData) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await paymentService.processPayment(paymentData);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refund a payment
  const refundPayment = useCallback(async (refundData) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await paymentService.refundPayment(refundData);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get payment status
  const getPaymentStatus = useCallback(async (transactionId) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await paymentService.checkPaymentStatus(transactionId);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, makePayment, refundPayment, getPaymentStatus };
}

export default usePaymentApi;
