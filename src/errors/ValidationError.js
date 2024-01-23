import RequestError from "./RequestError.js";

class ValidationError extends RequestError {
  constructor(error){
    const errorMessage = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${errorMessage}`);
  }
}

export default ValidationError;