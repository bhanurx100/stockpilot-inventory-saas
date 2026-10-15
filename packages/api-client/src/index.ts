/**
 * @stockpilot/api-client — typed transport + endpoints + query keys.
 * Shared by web and mobile. Base URL comes from config/env (never hardcoded).
 * Authentication is carried only by the HTTP-only session cookie.
 */
export { apiClient, type ApiResponse } from "./client";
export { API_ENDPOINTS, type ApiEndpoint } from "./endpoints";
export {
  ApiError,
  NetworkError,
  getErrorMessage,
  isAuthError,
  isNetworkError,
  isAxiosError,
  createApiError,
} from "./errors";
export { createQueryClient, queryKeys } from "./query-keys";
