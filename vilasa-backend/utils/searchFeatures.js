/**
 * Class representing search features for querying database
 * @class SearchFeatures
 * @author Kuntal Roy
 */
class SearchFeatures {
    /**
     * Create a SearchFeatures instance
     * @constructor
     * @param {Object} query - Mongoose query object
     * @param {Object} queryString - Query string parameters
     */
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    /**
     * Apply search filtering based on keyword
     * @method search
     * @returns {SearchFeatures} SearchFeatures instance
     */
    search() {
      // Define keyword search criteria
      const keyword = this.queryString.keyword ? {
        name: {
          $regex: this.queryString.keyword,
          $options: "i", // Case-insensitive search
        }
      } : {};
  
      // Apply keyword search to query
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    /**
     * Apply additional filtering based on query parameters
     * @method filter
     * @returns {SearchFeatures} SearchFeatures instance
     */
    filter() {
      // Create a copy of the query string parameters
      const queryCopy = { ...this.queryString };
  
      // Fields to remove from query
      const removeFields = ["keyword", "page", "limit"];
  
      // Remove specified fields from the query
      removeFields.forEach(key => delete queryCopy[key]);
  
      // Convert query string to MongoDB query format
      let queryString = JSON.stringify(queryCopy);
      queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
  
      // Apply additional filtering to the query
      this.query = this.query.find(JSON.parse(queryString));
      return this;
    }
  
    /**
     * Apply pagination to the query results
     * @method pagination
     * @param {number} resultPerPage - Number of results per page
     * @returns {SearchFeatures} SearchFeatures instance
     * @throws {ErrorHandler} If the resultPerPage parameter is invalid
     */
    pagination(resultPerPage) {
      // Validate resultPerPage parameter
      if (resultPerPage === undefined) {
        throw new ErrorHandler("Invalid number of results per page", 400);
      }
  
      // Extract current page from query string or set default value
      const currentPage = parseInt(this.queryString.page, 10) || 1;
  
      // Calculate number of documents to skip
      const skipProducts = resultPerPage * (currentPage - 1);
  
      // Apply pagination to the query
      this.query = this.query.limit(resultPerPage).skip(skipProducts);
      return this;
    }
  }
  
  module.exports = SearchFeatures;
  