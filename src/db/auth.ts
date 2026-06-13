import { getDB } from './database';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'acron2024',
};

export interface AuthUser {
  username: string;
  loggedInAt: string;
  lastActivity: string;
}

export async function initAuth(): Promise<void> {
  const db = await getDB();
  const existing = await db.get('auth', 'admin');
  if (!existing) {
    await db.put('auth', {
      id: 'admin',
      username: ADMIN_CREDENTIALS.username,
      password: ADMIN_CREDENTIALS.password,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  const db = await getDB();
  const user = await db.get('auth', 'admin');

  if (!user) {
    return { success: false, error: 'Пользователь не найден' };
  }

  if (user.username !== username || user.password !== password) {
    return { success: false, error: 'Неверный логин или пароль' };
  }

  // Update last login
  await db.put('auth', {
    id: 'admin',
    username,
    password,
    lastLogin: new Date().toISOString(),
  });

  // Set session
  sessionStorage.setItem('acron-admin-session', JSON.stringify({
    username,
    loggedInAt: new Date().toISOString(),
  }));

  return { success: true };
}

export function logout(): void {
  sessionStorage.removeItem('acron-admin-session');
}

export function getSession(): AuthUser | null {
  const data = sessionStorage.getItem('acron-admin-session');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
