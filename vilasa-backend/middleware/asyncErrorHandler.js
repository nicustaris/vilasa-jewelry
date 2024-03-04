/**
 * Middleware to handle errors asynchronously and pass them to the next middleware
 * @param {Function} errorFunction - The function that generates an error or handles an asynchronous operation that may throw an error
 * @returns {Function} Express middleware function
 * @description This middleware wraps the errorFunction in a Promise and catches any errors that occur during its execution. 
 * It then passes the error to the next middleware in the Express middleware chain.
 */
module.exports = errorFunction => (req, res, next) => {
    // Wrap the errorFunction in a Promise
    Promise.resolve(errorFunction(req, res, next))
        // Catch any errors that occur during execution of the errorFunction
        .catch(next);
}
