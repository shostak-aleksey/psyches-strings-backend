class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }

  static unauthorized(msg) {
    return new ApiError(401, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }
}
