// PaymentService: Integrates with 3rd-party payment API
import httpClient from "../api/httpClient";
import ApiError from "../utils/ApiError";

// Validate required fields for payment
function validatePaymentData(data) {
  const required = ["amount", "currency", "source"];
  for (const field of required) {
    if (!data[field])
      throw new ApiError(`Missing required field: ${field}`, 400);
  }
}

// Validate required fields for refund
function validateRefundData(data) {
  const required = ["transactionId", "amount"];
  for (const field of required) {
    if (!data[field])
      throw new ApiError(`Missing required field: ${field}`, 400);
  }
}

const paymentService = {
  /**
   * Process a payment
   * @param {Object} paymentData
   * @returns {Promise<Object>} Normalized response
   */
  async processPayment(paymentData) {
    try {
      validatePaymentData(paymentData);
      const res = await httpClient.post("/payments", paymentData);
      const d = res.data;
      return {
        transactionId: d.transactionId,
        status: d.status,
        amount: d.amount,
        currency: d.currency,
        createdAt: d.createdAt,
      };
    } catch (err) {
      throw ApiError.fromAxiosError(err);
    }
  },

  /**
   * Refund a payment
   * @param {Object} refundData
   * @returns {Promise<Object>} Normalized refund response
   */
  async refundPayment(refundData) {
    try {
      validateRefundData(refundData);
      const res = await httpClient.post("/refunds", refundData);
      const d = res.data;
      return {
        refundId: d.refundId,
        transactionId: d.transactionId,
        status: d.status,
        amount: d.amount,
        currency: d.currency,
        createdAt: d.createdAt,
      };
    } catch (err) {
      throw ApiError.fromAxiosError(err);
    }
  },

  /**
   * Check payment status
   * @param {string} transactionId
   * @returns {Promise<Object>} Normalized status response
   */
  async checkPaymentStatus(transactionId) {
    try {
      if (!transactionId) throw new ApiError("Missing transactionId", 400);
      const res = await httpClient.get(`/payments/${transactionId}`);
      const d = res.data;
      return {
        transactionId: d.transactionId,
        status: d.status,
        amount: d.amount,
        currency: d.currency,
        createdAt: d.createdAt,
      };
    } catch (err) {
      throw ApiError.fromAxiosError(err);
    }
  },
};

export default paymentService;
