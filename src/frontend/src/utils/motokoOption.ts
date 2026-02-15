/**
 * Utility to normalize Motoko optional values from Candid.
 * Handles both already-normalized values and Candid Option shapes.
 */

interface CandidSome<T> {
  __kind__: 'Some';
  value: T;
}

interface CandidNone {
  __kind__: 'None';
}

type CandidOption<T> = CandidSome<T> | CandidNone;

/**
 * Unwraps a Motoko optional value to T | null.
 * Handles both Candid Option shapes and already-normalized values.
 */
export function unwrapOption<T>(value: T | null | undefined | CandidOption<T>): T | null {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return null;
  }

  // Handle Candid Option shape
  if (typeof value === 'object' && value !== null && '__kind__' in value) {
    const option = value as CandidOption<T>;
    if (option.__kind__ === 'Some') {
      return option.value;
    }
    if (option.__kind__ === 'None') {
      return null;
    }
  }

  // Already normalized or direct value
  return value as T;
}
