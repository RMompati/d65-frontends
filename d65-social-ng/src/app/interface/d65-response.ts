export interface D65Response {
  timestamp: Date;
  message: string;
  status: string;
  statusCode: number;
  data: {}
}

export const emptyResponse: D65Response = {
  timestamp: new Date(),
  message: '',
  status: "FORBIDDEN",
  statusCode: 403,
  data: {}
};
