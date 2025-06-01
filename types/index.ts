/**
 * Common API response types
 */

// Base API response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta;
}

// Error response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

