import { createClient } from '@supabase/supabase-js';

// =============================================
// КОНФИГУРАЦИЯ SUPABASE
// =============================================
// 
// Ваш проект: dszawzmlbjqxjqqowdes
// 
// ⚠️ ВСТАВЬТЕ ВАШ anon public KEY НИЖЕ!
// Найдите его: Settings → API → anon public
//
// =============================================

const SUPABASE_URL = 'https://dszawzmlbjqxjqqowdes.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzemF3em1sYmpxeGpxcW93ZGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTc5MzIsImV4cCI6MjA5Njg3MzkzMn0.pcjTSZsqt2queDjucCgn5PiiMJDQcSkh3OvoId48T98';

// Проверка конфигурации
const isConfigured = true;

// Создаём клиент (или null, если не настроен)
export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const isSupabaseConfigured = isConfigured;

// =============================================
// ТИПЫ ДАННЫХ
// =============================================

export interface Admin {
  id: string;
  username: string;
  email: string | null;
  created_at: string;
  last_login: string | null;
}

export interface SiteContent {
  id: number;
  section: string;
  data: Record<string, unknown>;
  updated_at: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  tags: string[];
  sort_order: number;
  is_active: boolean;
}

export interface Project {
  id: number;
  year: string;
  category: string | null;
  title: string;
  description: string | null;
  results: string[];
  badge: string | null;
  badge_color: string;
  is_hot: boolean;
  is_active: boolean;
}

export interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string | null;
  sort_order: number;
}

export interface Contact {
  id: number;
  type: string;
  value: string;
  label: string | null;
  sort_order: number;
}

export interface ContactRequest {
  id?: number;
  name: string;
  company: string | null;
  email: string;
  message: string | null;
  status?: string;
  created_at?: string;
}

// =============================================
// API ФУНКЦИИ
// =============================================

// Получить весь контент сайта
export async function fetchAllContent(): Promise<Record<string, unknown>> {
  if (!supabase) return {};
  
  const [
    { data: content },
    { data: services },
    { data: projects },
    { data: stats },
    { data: contacts }
  ] = await Promise.all([
    supabase.from('site_content').select('*'),
    supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('projects').select('*').eq('is_active', true).order('year', { ascending: false }),
    supabase.from('stats').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('contacts').select('*').order('sort_order'),
  ]);

  const result: Record<string, unknown> = {};

  // Разбираем site_content
  content?.forEach((row: SiteContent) => {
    result[row.section] = row.data;
  });

  // Добавляем списки
  result.services = services || [];
  result.projects = projects || [];
  result.stats = stats || [];
  result.contactsList = contacts || [];

  return result;
}

// Обновить контент секции
export async function updateSiteContent(section: string, data: unknown): Promise<boolean> {
  if (!supabase) return false;
  
  const { error } = await supabase
    .from('site_content')
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' });
  
  return !error;
}

// Авторизация
export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string; admin?: Admin }> {
  if (!supabase) return { success: false, error: 'Supabase не настроен' };
  
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .eq('password_hash', password)
    .single();

  if (error || !data) {
    return { success: false, error: 'Неверный логин или пароль' };
  }

  // Обновляем last_login
  await supabase
    .from('admins')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id);

  return { success: true, admin: data };
}

// ─── УСЛУГИ ───

export async function fetchServices(): Promise<Service[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('services').select('*').order('sort_order');
  return data || [];
}

export async function createService(service: Partial<Service>): Promise<Service | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('services').insert(service).select().single();
  return error ? null : data;
}

export async function updateService(id: number, service: Partial<Service>): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('services').update({ ...service, updated_at: new Date().toISOString() }).eq('id', id);
  return !error;
}

export async function deleteService(id: number): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('services').delete().eq('id', id);
  return !error;
}

// ─── ПРОЕКТЫ ───

export async function fetchProjects(): Promise<Project[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('projects').select('*').order('year', { ascending: false });
  return data || [];
}

export async function createProject(project: Partial<Project>): Promise<Project | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('projects').insert(project).select().single();
  return error ? null : data;
}

export async function updateProject(id: number, project: Partial<Project>): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('projects').update({ ...project, updated_at: new Date().toISOString() }).eq('id', id);
  return !error;
}

export async function deleteProject(id: number): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return !error;
}

// ─── СТАТИСТИКА ───

export async function fetchStats(): Promise<Stat[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('stats').select('*').order('sort_order');
  return data || [];
}

export async function updateStat(id: number, stat: Partial<Stat>): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('stats').update(stat).eq('id', id);
  return !error;
}

// ─── ЗАЯВКИ ───

export async function submitContactRequest(request: ContactRequest): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('contact_requests').insert(request);
  return !error;
}

export async function fetchContactRequests(): Promise<ContactRequest[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
  return data || [];
}
