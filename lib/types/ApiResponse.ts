export type ApiResponse<T> = {
  data: T;
  meta: {
    total: number;
    count: number;
    page: number;
    limit: number;
  };
  links: {
    self: string;
    next: string | null;
    prev: string | null;
  };
  message: string;
  statusCode: number;
};
