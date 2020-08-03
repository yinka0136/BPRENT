export interface ResponseStructure {
  responseCode: any;
  responseMessage: string;
  responseResult: any;
}

export const ResponseCode = {
  BAD_REQUEST: 'BAD_REQUEST',
  OK: 'OK',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
};
