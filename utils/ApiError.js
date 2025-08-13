// ApiError: Standardized error for API/network failures
class ApiError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} httpStatus - HTTP status code
   * @param {string|number} [errorCode] - Optional error code from API
   * @param {any} [errorDetails] - Optional error details
   */
  constructor(message, httpStatus, errorCode = null, errorDetails = null) {
    super(message);
    this.name = "ApiError";
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.errorDetails = errorDetails;
  }

  /**
   * Normalize an Axios error to ApiError
   * @param {any} error - Axios error object
   * @returns {ApiError}
   */
  static fromAxiosError(error) {
    if (error.response) {
      // API responded with error
      const status = error.response.status;
      const code = error.response.data?.errorCode || null;
      const details = error.response.data || null;
      const msg = error.response.data?.message || `API Error: ${status}`;
      return new ApiError(msg, status, code, details);
    } else if (error.request) {
      // No response received
      return new ApiError(
        "Network error: No response from server",
        0,
        null,
        null
      );
    } else {
      // Other error
      return new ApiError(error.message || "Unknown error", 0, null, null);
    }
  }
}

module.exports = ApiError;
