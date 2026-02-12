const ADMIN_REDIRECT_KEY = 'admin_intended_path';

export function setIntendedAdminPath(path: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(ADMIN_REDIRECT_KEY, path);
  }
}

export function getIntendedAdminPath(): string {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(ADMIN_REDIRECT_KEY) || '/admin';
  }
  return '/admin';
}

export function clearIntendedAdminPath(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_REDIRECT_KEY);
  }
}
