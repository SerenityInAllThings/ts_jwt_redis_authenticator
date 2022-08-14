type ErrorCode = "invalidBody" | "userAlreadyExists" | "notImplemented" | "internalError"

class InternalError extends Error {
  constructor(public readonly code: ErrorCode, message?: string) {
    super(message);
  }
}

const isInternalError = (value?: any): value is InternalError => value?.code;

const getHttpStatus = (code: ErrorCode) => {
  switch (code) {
    case "invalidBody":
      return 400;
    case "userAlreadyExists":
      return 409;
    case "notImplemented":
      return 501;
    default:
      return 500;
  }
};

export { ErrorCode, InternalError, isInternalError, getHttpStatus };
