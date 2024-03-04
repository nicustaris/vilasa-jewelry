/**
 * Custom error class for handling application errors
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
    /**
     * Create an instance of ErrorHandler
     * @constructor
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
