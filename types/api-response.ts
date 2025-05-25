export interface CommonResponse<T> {
  success: boolean;
  status: number;
  message: string;
  response: T;
}

export interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
  response: {
    errorCode: string;
    errors?: { field: string; message: string }[];
  };
}
