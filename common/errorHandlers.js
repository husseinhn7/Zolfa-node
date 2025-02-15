export const catchError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  

export class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
  
      // Capture stack trace for debugging
      Error.captureStackTrace(this, this.constructor);
    }
  
   
    static badRequest(message = "Bad Request") {
      return new ApiError(400, message);
    }
 
    static unauthorized(message = "Unauthorized") {
      return new ApiError(401, message);
    }
 
    static forbidden(message = "Forbidden") {
      return new ApiError(403, message);
    }
  
 
    static notFound(message = "Not Found") {
      return new ApiError(404, message);
    }
  
  
    static conflict(message = "Conflict") {
      return new ApiError(409, message);
    }
 
    static unprocessableEntity(message = "Unprocessable Entity") {
      return new ApiError(422, message);
    }
  
 
    static internal(message = "Internal Server Error") {
      return new ApiError(500, message);
    }
  }
  
 
  
 
export const globalErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,  
    });
  };
  
   