import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  isSupabaseConfigured, 
  fetchAllContent as fetchSupabaseContent,
  updateSiteContent as updateSupabaseContent,
} from '../lib/supabase';
import { 
  getAllContent as getIndexedDBContent, 
  saveContent as saveIndexedDBContent, 
  seedDatabase 
} from '../db/database';
import { initAuth, logout as doLogout, login as doLocalLogin } from '../db/auth';

interface Session {
  username: string;
  loggedInAt: string;
}

interface SiteContextType {
  content: Record<string, unknown>;
  loading: boolean;
  refreshContent: () => Promise<void>;
  updateSection: (section: string, data: unknown) => Promise<void>;
  session: Session | null;
  login: (u: string, p: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  dbType: 'supabase' | 'indexeddb';
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [activeDb, setActiveDb] = useState<'supabase' | 'indexeddb'>('indexeddb');

  // Загрузка контента с fallback
  const refreshContent = useCallback(async () => {
    // Всегда инициализируем локальную БД
    await Promise.all([seedDatabase(), initAuth()]);

    if (isSupabaseConfigured) {
      try {
        const data = await fetchSupabaseContent();
        if (Object.keys(data).length > 0) {
          setContent(data);
          setActiveDb('supabase');
          return;
        }
      } catch {
        console.warn('Supabase недоступен, используем локальную БД');
      }
    }

    // Fallback на IndexedDB
    const data = await getIndexedDBContent();
    setContent(data);
    setActiveDb('indexeddb');
  }, []);

  // Инициализация
  useEffect(() => {
    async function init() {
      await refreshContent();
      const sess = sessionStorage.getItem('acron-admin-session');
      if (sess) {
        try { setSession(JSON.parse(sess)); } catch {}
      }
      setLoading(false);
    }
    init();
  }, [refreshContent]);

  // Обновление секции
  const updateSection = async (section: string, data: unknown) => {
    if (activeDb === 'supabase') {
      try {
        await updateSupabaseContent(section, data);
      } catch {
        await saveIndexedDBContent(section, data);
      }
    } else {
      await saveIndexedDBContent(section, data);
    }
    await refreshContent();
  };

  // ═══════════════════════════════════════════
  // Авторизация — ВСЕГДА через локальную БД
  // ═══════════════════════════════════════════
  const login = async (username: string, password: string) => {
    const result = await doLocalLogin(username, password);
    if (result.success) {
      const sessData = sessionStorage.getItem('acron-admin-session');
      if (sessData) setSession(JSON.parse(sessData));
    }
    return result;
  };

  // Выход
  const logout = () => {
    doLogout();
    sessionStorage.removeItem('acron-admin-session');
    setSession(null);
  };

  return (
    <SiteContext.Provider value={{
      content, loading, refreshContent, updateSection,
      session, login, logout,
      isAdmin: !!session,
      dbType: activeDb,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
