-- =============================================
-- ACRON DIGITAL — СХЕМА БАЗЫ ДАННЫХ
-- PostgreSQL (Supabase)
-- =============================================

-- Таблица: Администраторы
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Таблица: Контент сайта (ключ-значение)
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) UNIQUE NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES admins(id)
);

-- Таблица: Услуги
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(50) DEFAULT 'database',
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(200),
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица: Проекты
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  year VARCHAR(4) NOT NULL,
  category VARCHAR(100),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  results TEXT[] DEFAULT '{}',
  badge VARCHAR(50),
  badge_color VARCHAR(20) DEFAULT '#3b82f6',
  is_hot BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица: Статистика
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  value INT NOT NULL,
  suffix VARCHAR(10) DEFAULT '+',
  label VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Таблица: Контакты
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL, -- 'address', 'phone', 'email'
  value VARCHAR(255) NOT NULL,
  label VARCHAR(100),
  sort_order INT DEFAULT 0
);

-- Таблица: Заявки с сайта
CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'processing', 'done'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES admins(id)
);

-- Таблица: Логи действий
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  admin_id UUID REFERENCES admins(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INT,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- НАЧАЛЬНЫЕ ДАННЫЕ
-- =============================================

-- Администратор (пароль: acron2024)
INSERT INTO admins (username, password_hash, email) VALUES 
('admin', 'acron2024', 'admin@acron.ru')
ON CONFLICT (username) DO NOTHING;

-- Контент Hero
INSERT INTO site_content (section, data) VALUES 
('hero', '{
  "badge": "Дочерняя компания ПАО «Акрон» · ООО «АйТиОфис»",
  "title_line1": "Поставщик решений",
  "title_line2": "в области",
  "typing_words": ["цифровой трансформации", "информационной безопасности", "корпоративных ERP-систем", "мобильных приложений", "ИТ-инфраструктуры"],
  "subtitle": "Acron Digital — внутренний ИТ-интегратор группы «Акрон». Разрабатываем, внедряем и сопровождаем корпоративные системы. Свыше 4 600 пользователей ERP собственной разработки.",
  "badges": [
    {"icon": "shield", "text": "Информационная безопасность"},
    {"icon": "cpu", "text": "ERP & Digital"},
    {"icon": "globe", "text": "Группа Акрон"}
  ],
  "stats": [
    {"value": "4 600+", "label": "Пользователей ERP"},
    {"value": "15+", "label": "Лет опыта"},
    {"value": "10 000+", "label": "Сотрудников группы"}
  ]
}'::jsonb)
ON CONFLICT (section) DO NOTHING;

-- Контент About
INSERT INTO site_content (section, data) VALUES 
('about', '{
  "title_line1": "Поставщик решений",
  "title_line2": "мирового уровня",
  "title_line3": "для «Акрона»",
  "paragraph1": "<strong>Acron Digital (ООО «АйТиОфис»)</strong> — дочерняя компания ПАО «Акрон», специализирующаяся на разработке и внедрении корпоративных ИТ-решений, цифровой трансформации производственных процессов и обеспечении информационной безопасности.",
  "paragraph2": "Мы создаём собственные ERP-платформы, внедряем искусственный интеллект, разрабатываем мобильные приложения и обеспечиваем бесперебойную работу ИТ-инфраструктуры крупнейшего химического холдинга России.",
  "features": [
    {"icon": "building", "title": "Дочерняя компания ПАО «Акрон»", "desc": "Входим в структуру одного из ведущих производителей минеральных удобрений"},
    {"icon": "users", "title": "Внутренний ИТ-интегратор", "desc": "Обслуживаем все предприятия группы: ПАО «Акрон», ПАО «Дорогобуж», АО «СЗФК», АО «ВКК»"},
    {"icon": "map", "title": "Великий Новгород", "desc": "Центральный офис, распределённые команды на всех производственных площадках"},
    {"icon": "award", "title": "Экспертиза ИБ", "desc": "Глубокая экспертиза в информационной безопасности промышленных систем"},
    {"icon": "trending", "title": "Цифровая трансформация", "desc": "Системная работа по оцифровке производственных и управленческих процессов"},
    {"icon": "briefcase", "title": "Полный цикл услуг", "desc": "От аналитики до разработки, внедрения и многолетнего сопровождения"}
  ]
}'::jsonb)
ON CONFLICT (section) DO NOTHING;

-- Услуги
INSERT INTO services (icon, title, subtitle, description, tags, sort_order) VALUES 
('database', 'ERP-системы', 'Корпоративные информационные системы', 'Разработка, внедрение и техническое сопровождение корпоративных информационных систем. Собственная ERP-платформа ИСА с более чем 4 600 активными пользователями.', ARRAY['1С:Предприятие', 'ERP ИСА', 'Oracle', 'СУБД'], 1),
('shield', 'Информационная безопасность', 'ИБ-экспертиза в ИТ-проектах', 'Комплексная защита информационных систем предприятия. Экспертиза ИБ на всех этапах ИТ-проектов.', ARRAY['SOC', 'Аудит ИБ', 'Защищённые контуры', 'Compliance'], 2),
('network', 'ИТ-инфраструктура', 'Телекоммуникационные проекты', 'Проектирование и развёртывание инфраструктуры, телекоммуникационные проекты, системная интеграция.', ARRAY['Сети', 'ЦОД', 'VPN', 'Телеком'], 3),
('globe', 'Веб-разработка', '1С-Bitrix & корпоративные порталы', 'Внедрение решений в области веб-разработки на базе платформы 1С-Bitrix.', ARRAY['1С-Bitrix', 'Порталы', 'Интеграции', 'UI/UX'], 4),
('smartphone', 'Мобильные приложения', 'iOS, Android, корпоративные решения', 'Разработка мобильных приложений для корпоративных задач. Включая Acron SuperApp.', ARRAY['iOS', 'Android', 'SuperApp', 'ИИ-помощник'], 5),
('barChart', 'Аналитика & BI', 'Бизнес-аналитика и Data Mining', 'Аналитика бизнес-процессов, внедрение BI-решений, Big Data, Data Mining.', ARRAY['Qlik Sense', 'Big Data', 'BI', 'Data Mining'], 6),
('bot', 'RPA & Автоматизация', 'Роботизация бизнес-процессов', 'Проекты роботизированной автоматизации процессов (RPA).', ARRAY['RPA', 'Роботы', 'Автоматизация', 'EDI'], 7),
('layers', 'ИТ-аутсорсинг', 'Полный цикл ИТ-сопровождения', 'Комплексное ИТ-сопровождение предприятий группы «Акрон».', ARRAY['Service Desk', 'ITSM', 'L1-L3', 'Help Desk'], 8),
('zap', 'Искусственный интеллект', 'ИИ-решения и LLM', 'Внедрение ИИ-порталов и интеллектуальных помощников. Гибридный подход.', ARRAY['LLM', 'ИИ-портал', 'RAG', 'NLP'], 9)
ON CONFLICT DO NOTHING;

-- Проекты
INSERT INTO projects (year, category, title, description, results, badge, badge_color, is_hot) VALUES 
('2026', 'Искусственный интеллект', 'Корпоративный ИИ-портал', 'Разработан и внедрён корпоративный ИИ-портал для сотрудников группы «Акрон». Гибридный подход: локальные языковые модели + облачные LLM.', ARRAY['Упрощён доступ к корпоративным базам знаний', 'Автоматизирована работа с инструкциями', 'Гибридная архитектура'], 'AI & LLM', '#6366f1', true),
('2025', 'Мобильная разработка', 'Acron SuperApp', 'Запущено корпоративное мобильное приложение SuperApp — единая точка доступа ко всем ключевым сервисам.', ARRAY['Корпоративная почта и новостной портал', 'ERP-система ИСА и кадровый ЭДО', 'ITSM, ВКС и ИИ-помощник'], 'Mobile', '#06b6d4', true),
('2026', 'ERP & Цифровизация', 'Цифровой входной контроль', 'Масштабирование проекта цифрового входного контроля ТМЦ. Полная интеграция в ERP ИСА.', ARRAY['Автоматическое формирование заказов', 'Электронные акты в СЭД', 'Полная прослеживаемость поставок'], 'ERP', '#3b82f6', false),
('2022', 'Цифровой документооборот', 'Внутренняя система ЭДО', 'Разработка внутренней системы электронного документооборота (EDI). 40 000+ документов/год.', ARRAY['Полная цифровизация нарядов-допуска', 'Сокращение времени согласования', 'Электронный журнал'], 'EDI', '#10b981', false),
('2025', 'RPA', 'Роботизация бизнес-процессов', 'Внедрение RPA-решений для автоматизации рутинных операций.', ARRAY['Снижение ручного труда', 'Интеграция с 1С', 'Быстрый ROI'], 'RPA', '#eab308', false),
('2024', 'ITSM & Аутсорсинг', 'ИТ-сопровождение предприятий', 'Комплексное ИТ-сопровождение всех производственных площадок группы.', ARRAY['SLA 99.9%', 'Единая ITSM-платформа', 'Поддержка 10 000+ сотрудников'], 'ITSM', '#f97316', false)
ON CONFLICT DO NOTHING;

-- Статистика
INSERT INTO stats (value, suffix, label, description, sort_order) VALUES 
(4600, '+', 'Пользователей ERP ИСА', 'Ежедневно работают в системе собственной разработки', 1),
(40000, '+', 'Нарядов-допуска / год', 'Полностью оцифрованы в системе ЭДО', 2),
(25000, '+', 'Актов движения ТМЦ / год', 'Электронный учёт товарно-материальных ценностей', 3),
(10000, '+', 'Сотрудников на поддержке', 'Обслуживаются ИТ-аутсорсингом Acron Digital', 4)
ON CONFLICT DO NOTHING;

-- Контакты
INSERT INTO contacts (type, value, label, sort_order) VALUES 
('address', 'г. Великий Новгород, Россия, 173012', 'Адрес', 1),
('phone', '+7 (8162) 99-65-58', 'Телефон', 2),
('email', 'info@acron.ru', 'E-mail', 3)
ON CONFLICT DO NOTHING;

-- Настройки сайта
INSERT INTO site_content (section, data) VALUES 
('settings', '{"siteName": "Acron Digital", "siteDescription": "Цифровая трансформация и ИТ-решения"}'::jsonb)
ON CONFLICT (section) DO NOTHING;

-- =============================================
-- ПОЛИТИКИ БЕЗОПАСНОСТИ (RLS)
-- =============================================

-- Включаем RLS для таблиц
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Политика: чтение для всех (анонимный доступ)
CREATE POLICY "Allow public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON stats FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON contacts FOR SELECT USING (true);

-- Политика: вставка заявок для всех
CREATE POLICY "Allow public insert" ON contact_requests FOR INSERT WITH CHECK (true);

-- =============================================
-- ГОТОВО!
-- =============================================
