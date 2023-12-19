export class CustomError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(StatusCode.BAD_REQUEST, message);
  }
  static unauthorized(message: string) {
    return new CustomError(StatusCode.UNAUTHORIZED, message);
  }
  static forbidden(message: string) {
    return new CustomError(StatusCode.FORBIDDEN, message);
  }
  static notFound(message: string) {
    return new CustomError(StatusCode.NOT_FOUND, message);
  }
  static internalServerError(message: string ='Internal Server Error') {
    return new CustomError(StatusCode.INTERNAL_SERVER_ERROR, message);
  }
}

enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
