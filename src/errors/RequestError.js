import BaseError from "./BaseError.js";

class RequestError extends BaseError {
  constructor(message = "Um ou mais dados fornecidos estão incorretos.") {
    super(message, 400);
  }
}

export default RequestError;