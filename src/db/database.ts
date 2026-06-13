import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'acron-digital-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<unknown> | null = null;

export async function getDB(): Promise<IDBPDatabase<unknown>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Auth store
      if (!db.objectStoreNames.contains('auth')) {
        const authStore = db.createObjectStore('auth', { keyPath: 'id' });
        authStore.createIndex('username', 'username');
      }

      // Content store — all page content
      if (!db.objectStoreNames.contains('content')) {
        db.createObjectStore('content', { keyPath: 'section' });
      }

      // Pages (for future multi-page)
      if (!db.objectStoreNames.contains('pages')) {
        db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return dbInstance;
}

// ─── Default content ──────────────────────────────────────────────

export const DEFAULT_CONTENT: Record<string, unknown> = {
  hero: {
    badge: 'Дочерняя компания ПАО «Акрон» · ООО «АйТиОфис»',
    title_line1: 'Поставщик решений',
    title_line2: 'в области',
    typing_words: [
      'цифровой трансформации',
      'информационной безопасности',
      'корпоративных ERP-систем',
      'мобильных приложений',
      'ИТ-инфраструктуры',
    ],
    subtitle:
      'Acron Digital — внутренний ИТ-интегратор группы «Акрон». Разрабатываем, внедряем и сопровождаем корпоративные системы. Свыше 4 600 пользователей ERP собственной разработки.',
    badges: [
      { icon: 'shield', text: 'Информационная безопасность' },
      { icon: 'cpu', text: 'ERP & Digital' },
      { icon: 'globe', text: 'Группа Акрон' },
    ],
    stats: [
      { value: '4 600+', label: 'Пользователей ERP' },
      { value: '15+', label: 'Лет опыта' },
      { value: '10 000+', label: 'Сотрудников группы' },
    ],
  },
  about: {
    title_line1: 'Поставщик решений',
    title_line2: 'мирового уровня',
    title_line3: 'для «Акрона»',
    paragraph1:
      '<strong>Acron Digital (ООО «АйТиОфис»)</strong> — дочерняя компания ПАО «Акрон», специализирующаяся на разработке и внедрении корпоративных ИТ-решений, цифровой трансформации производственных процессов и обеспечении информационной безопасности.',
    paragraph2:
      'Мы создаём собственные ERP-платформы, внедряем искусственный интеллект, разрабатываем мобильные приложения и обеспечиваем бесперебойную работу ИТ-инфраструктуры крупнейшего химического холдинга России.',
    features: [
      { icon: 'building', title: 'Дочерняя компания ПАО «Акрон»', desc: 'Входим в структуру одного из ведущих производителей минеральных удобрений в России и мире' },
      { icon: 'users', title: 'Внутренний ИТ-интегратор', desc: 'Обслуживаем все предприятия группы: ПАО «Акрон», ПАО «Дорогобуж», АО «СЗФК», АО «ВКК»' },
      { icon: 'map', title: 'Великий Новгород', desc: 'Центральный офис в Великом Новгороде, распределённые команды на всех производственных площадках' },
      { icon: 'award', title: 'Экспертиза ИБ', desc: 'Глубокая экспертиза в информационной безопасности промышленных и корпоративных систем' },
      { icon: 'trending', title: 'Цифровая трансформация', desc: 'Системная работа по оцифровке производственных, инженерных и управленческих процессов группы' },
      { icon: 'briefcase', title: 'Полный цикл услуг', desc: 'От аналитики бизнес-процессов до разработки, внедрения и многолетнего сопровождения систем' },
    ],
  },
  services: [
    {
      icon: 'database',
      title: 'ERP-системы',
      subtitle: 'Корпоративные информационные системы',
      description:
        'Разработка, внедрение и техническое сопровождение корпоративных информационных систем. Собственная ERP-платформа ИСА с более чем 4 600 активными пользователями.',
      tags: ['1С:Предприятие', 'ERP ИСА', 'Oracle', 'СУБД'],
    },
    {
      icon: 'shield',
      title: 'Информационная безопасность',
      subtitle: 'ИБ-экспертиза в ИТ-проектах',
      description:
        'Комплексная защита информационных систем предприятия. Экспертиза ИБ на всех этапах ИТ-проектов: аудит, проектирование защищённых архитектур, сопровождение.',
      tags: ['SOC', 'Аудит ИБ', 'Защищённые контуры', 'Compliance'],
    },
    {
      icon: 'network',
      title: 'ИТ-инфраструктура',
      subtitle: 'Телекоммуникационные проекты',
      description:
        'Проектирование и развёртывание инфраструктуры, телекоммуникационные проекты, системная интеграция. Построение надёжных корпоративных сетей и ЦОД.',
      tags: ['Сети', 'ЦОД', 'VPN', 'Телеком'],
    },
    {
      icon: 'globe',
      title: 'Веб-разработка',
      subtitle: '1С-Bitrix & корпоративные порталы',
      description:
        'Внедрение решений в области веб-разработки на базе платформы 1С-Bitrix. Корпоративные порталы, интранет-решения, интеграции с бизнес-системами.',
      tags: ['1С-Bitrix', 'Порталы', 'Интеграции', 'UI/UX'],
    },
    {
      icon: 'smartphone',
      title: 'Мобильные приложения',
      subtitle: 'iOS, Android, корпоративные решения',
      description:
        'Разработка мобильных приложений для корпоративных задач. Включая Acron SuperApp — единую платформу доступа к корпоративным сервисам с ИИ-помощником.',
      tags: ['iOS', 'Android', 'SuperApp', 'ИИ-помощник'],
    },
    {
      icon: 'barChart',
      title: 'Аналитика & BI',
      subtitle: 'Бизнес-аналитика и Data Mining',
      description:
        'Аналитика бизнес-процессов, внедрение BI-решений, Big Data, Data Mining и Data Quality. Помогаем принимать решения на основе данных.',
      tags: ['Qlik Sense', 'Big Data', 'BI', 'Data Mining'],
    },
    {
      icon: 'bot',
      title: 'RPA & Автоматизация',
      subtitle: 'Роботизация бизнес-процессов',
      description:
        'Проекты роботизированной автоматизации процессов (RPA). Снижение рутинной нагрузки, ускорение документооборота, автоматический ввод и обработка данных.',
      tags: ['RPA', 'Роботы', 'Автоматизация', 'EDI'],
    },
    {
      icon: 'layers',
      title: 'ИТ-аутсорсинг',
      subtitle: 'Полный цикл ИТ-сопровождения',
      description:
        'Комплексное ИТ-сопровождение предприятий группы «Акрон». Service Desk, ITSM, поддержка пользователей, управление ИТ-активами и лицензиями.',
      tags: ['Service Desk', 'ITSM', 'L1-L3', 'Help Desk'],
    },
    {
      icon: 'zap',
      title: 'Искусственный интеллект',
      subtitle: 'ИИ-решения и LLM',
      description:
        'Внедрение ИИ-порталов и интеллектуальных помощников для сотрудников. Гибридный подход: локальные модели в защищённом контуре + внешние облачные LLM.',
      tags: ['LLM', 'ИИ-портал', 'RAG', 'NLP'],
    },
  ],
  projects: [
    {
      year: '2026',
      category: 'Искусственный интеллект',
      title: 'Корпоративный ИИ-портал',
      description:
        'Разработан и внедрён корпоративный ИИ-портал для сотрудников группы «Акрон». Гибридный подход: локальные языковые модели в защищённом контуре + внешние облачные LLM.',
      results: [
        'Упрощён доступ к корпоративным базам знаний',
        'Автоматизирована работа с инструкциями и регламентами',
        'Гибридная архитектура: безопасность + качество ответов',
      ],
      badge: 'AI & LLM',
      badgeColor: '#6366f1',
      hot: true,
    },
    {
      year: '2025',
      category: 'Мобильная разработка',
      title: 'Acron SuperApp',
      description:
        'Запущено корпоративное мобильное приложение SuperApp — единая точка доступа ко всем ключевым сервисам для сотрудников всей группы «Акрон».',
      results: [
        'Корпоративная почта и новостной портал',
        'ERP-система ИСА и кадровый ЭДО',
        'ITSM, ВКС и ИИ-помощник в одном приложении',
      ],
      badge: 'Mobile',
      badgeColor: '#06b6d4',
      hot: true,
    },
    {
      year: '2026',
      category: 'ERP & Цифровизация производства',
      title: 'Цифровой входной контроль',
      description:
        'Масштабирование проекта цифрового входного контроля ТМЦ на ключевой производственной площадке ПАО «Акрон» в Великом Новгороде.',
      results: [
        'Автоматическое формирование заказов на входной контроль',
        'Электронные акты и подписание в СЭД',
        'Полная прослеживаемость каждой партии поставок',
      ],
      badge: 'ERP',
      badgeColor: '#3b82f6',
      hot: false,
    },
    {
      year: '2022',
      category: 'Цифровой документооборот',
      title: 'Внутренняя система ЭДО',
      description:
        'Разработка внутренней системы электронного документооборота (EDI). Электронные наряды-допуски для опасных работ (40 000+ документов/год).',
      results: [
        'Полная цифровизация нарядов-допуска',
        'Сокращение времени согласования документов',
        'Электронный журнал безопасных работ',
      ],
      badge: 'EDI',
      badgeColor: '#10b981',
      hot: false,
    },
    {
      year: '2025',
      category: 'RPA',
      title: 'Роботизация бизнес-процессов',
      description:
        'Внедрение RPA-решений для автоматизации рутинных операций в ERP и смежных системах.',
      results: [
        'Снижение ручного труда на рутинных задачах',
        'Интеграция с 1С и корпоративными системами',
        'Быстрый ROI — запуск за недели',
      ],
      badge: 'RPA',
      badgeColor: '#eab308',
      hot: false,
    },
    {
      year: '2024',
      category: 'ITSM & Аутсорсинг',
      title: 'ИТ-сопровождение предприятий',
      description:
        'Комплексное ИТ-сопровождение всех производственных площадок группы «Акрон».',
      results: [
        'SLA 99.9% на критические системы',
        'Единая ITSM-платформа для всей группы',
        'Поддержка 10 000+ сотрудников',
      ],
      badge: 'ITSM',
      badgeColor: '#f97316',
      hot: false,
    },
  ],
  stats: [
    { value: 4600, suffix: '+', label: 'Пользователей ERP ИСА', description: 'Ежедневно работают в системе собственной разработки' },
    { value: 40000, suffix: '+', label: 'Нарядов-допуска / год', description: 'Полностью оцифрованы в системе ЭДО' },
    { value: 25000, suffix: '+', label: 'Актов движения ТМЦ / год', description: 'Электронный учёт товарно-материальных ценностей' },
    { value: 10000, suffix: '+', label: 'Сотрудников на поддержке', description: 'Обслуживаются ИТ-аутсорсингом Acron Digital' },
  ],
  contacts: {
    address: 'г. Великий Новгород, Россия, 173012',
    phone: '+7 (8162) 99-65-58',
    email: 'info@acron.ru',
  },
  settings: {
    siteName: 'Acron Digital',
    siteDescription: 'Цифровая трансформация и ИТ-решения',
  },
};

// ─── Seed initial data ────────────────────────────────────────────

export async function seedDatabase(): Promise<void> {
  const db = await getDB();

  for (const [section, data] of Object.entries(DEFAULT_CONTENT)) {
    const existing = await db.get('content', section);
    if (!existing) {
      await db.put('content', { section, data, updatedAt: new Date().toISOString() });
    }
  }
}

// ─── CRUD operations ──────────────────────────────────────────────

export async function getContent(section: string): Promise<unknown | undefined> {
  const db = await getDB();
  const row = await db.get('content', section);
  return row ? row.data : undefined;
}

export async function saveContent(section: string, data: unknown): Promise<void> {
  const db = await getDB();
  await db.put('content', { section, data, updatedAt: new Date().toISOString() });
}

export async function getAllContent(): Promise<Record<string, unknown>> {
  const db = await getDB();
  const tx = db.transaction('content', 'readonly');
  const all = await tx.objectStore('content').getAll();
  const result: Record<string, unknown> = {};
  for (const row of all) {
    result[row.section] = row.data;
  }
  return result;
}

export async function resetToDefaults(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  await store.clear();
  for (const [section, data] of Object.entries(DEFAULT_CONTENT)) {
    await store.put({ section, data, updatedAt: new Date().toISOString() });
  }
  await tx.done;
}
