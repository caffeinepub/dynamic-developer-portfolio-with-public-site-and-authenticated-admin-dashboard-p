/**
 * Normalizes backend admin authentication errors into user-friendly messages.
 * Sanitizes confusing role/permission-related error text that may leak from backend.
 */
export function normalizeAdminAuthError(errorMessage: string): string {
  const lowerError = errorMessage.toLowerCase();
  
  // Detect authorization/role/permission-related errors and convert to generic login failure
  if (
    lowerError.includes('unauthorized') ||
    lowerError.includes('role') ||
    lowerError.includes('permission') ||
    lowerError.includes('assign')
  ) {
    return 'Login failed. Please check your credentials and try again.';
  }
  
  // For other errors, return a generic friendly message
  if (lowerError.includes('session')) {
    return 'Session error. Please try logging in again.';
  }
  
  // Default fallback for any other backend error
  return 'An error occurred during login. Please try again.';
}
