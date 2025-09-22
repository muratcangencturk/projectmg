const Storage = (() => {
  const KEY = 'projectmg-dashboard-state';

  function load() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Yerel depolama yüklenemedi, varsayılan durum kullanılacak.', error);
      return null;
    }
  }

  function save(state) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Yerel depolama kaydı gerçekleştirilemedi.', error);
    }
  }

  function reset() {
    try {
      window.localStorage.removeItem(KEY);
    } catch (error) {
      console.warn('Yerel depolama sıfırlanamadı.', error);
    }
  }

  return { load, save, reset, KEY };
})();

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Yapılacak', tagClass: 'tag--todo' },
  { value: 'in-progress', label: 'Devam ediyor', tagClass: 'tag--in-progress' },
  { value: 'review', label: 'İncelemede', tagClass: 'tag--review' },
  { value: 'done', label: 'Tamamlandı', tagClass: 'tag--done' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Düşük', tagClass: 'tag--low' },
  { value: 'medium', label: 'Orta', tagClass: 'tag--medium' },
  { value: 'high', label: 'Yüksek', tagClass: 'tag--high' },
];

const PROJECT_HEALTH = {
  'on-track': {
    label: 'Takviminde',
    statusClass: 'project-card__status--on-track',
  },
  attention: {
    label: 'Riskte',
    statusClass: 'project-card__status--attention',
  },
  'off-track': {
    label: 'Kritik',
    statusClass: 'project-card__status--off-track',
  },
};

const NOTIFICATION_TEMPLATES = [
  {
    type: 'Hatırlatma',
    message: 'Ürün konseyi toplantısı 30 dakika içinde başlıyor.',
  },
  {
    type: 'Risk',
    message: 'Atlas veri platformu ETL hattı gecikme bildirimi gönderdi.',
  },
  {
    type: 'Bilgi',
    message: 'Aurora mobil ekibi yeni tasarım bileşenlerini yükledi.',
  },
  {
    type: 'İş birliği',
    message: 'Vega pazaryeri için QA ekibinden inceleme isteği geldi.',
  },
  {
    type: 'Başarı',
    message: 'Sprint 34 hedeflerinin %92’si tamamlandı. Tebrikler!',
  },
];

function createDefaultState() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';

  const projects = [
    {
      id: 'proj-aurora',
      name: 'Aurora Mobil Uygulaması',
      owner: 'Selin Aydın',
      dueDate: '2024-07-18',
      health: 'on-track',
      summary: 'Ödeme deneyimini yeniden tasarlayarak dönüşümü artırma.',
    },
    {
      id: 'proj-atlas',
      name: 'Atlas Veri Platformu',
      owner: 'Mert Korkmaz',
      dueDate: '2024-09-02',
      health: 'attention',
      summary: 'Kaynak sistemlerden gelen veri akışlarını tekleştirme.',
    },
    {
      id: 'proj-vega',
      name: 'Vega Pazaryeri',
      owner: 'Ebru Yıldız',
      dueDate: '2024-10-15',
      health: 'off-track',
      summary: 'Tedarikçi portalını genişleterek yeni gelir kanalı açma.',
    },
  ];

  const tasks = [
    {
      id: 'task-aurora-research',
      projectId: 'proj-aurora',
      title: 'Kullanıcı araştırması derinleştirme',
      summary: 'Son 20 katılımcının görüşmelerini sentezleyip öne çıkan ihtiyaçları belirle.',
      description:
        'Aurora ödeme akışında yaşanan sürtünmeyi azaltmak için detaylı kullanıcı araştırması raporu hazırlanacak. Araştırma çıktıları, deney tasarımına referans olacak.',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Onur Demir',
      dueDate: '2024-05-24',
      tags: ['UX', 'Araştırma'],
      checklist: [
        { id: 'chk-1', label: 'Görüşme notlarını Notion’da derle', done: true },
        { id: 'chk-2', label: 'Duygu analizi matrisi çıkar', done: false },
        { id: 'chk-3', label: 'İçgörü slayt taslaklarını hazırla', done: false },
      ],
    },
    {
      id: 'task-aurora-wireframe',
      projectId: 'proj-aurora',
      title: 'Ödeme akışı wireframe güncellemesi',
      summary: 'Araştırma çıktısına göre ödeme ekranlarını yeniden düzenle.',
      description:
        'Yeni ödeme akışının düşük sadakatli prototipleri hazırlanacak. Ekip içi paylaşımla birlikte kullanışlılık testine hazır hale getirilecek.',
      status: 'todo',
      priority: 'medium',
      assignee: 'Dilara Yılmaz',
      dueDate: '2024-05-31',
      tags: ['UI', 'Prototip'],
      checklist: [
        { id: 'chk-4', label: 'Var olan bileşenleri envanterle', done: true },
        { id: 'chk-5', label: 'Ödeme adımlarını sadeleştir', done: false },
        { id: 'chk-6', label: 'Test senaryosu hazırla', done: false },
      ],
    },
    {
      id: 'task-atlas-pipeline',
      projectId: 'proj-atlas',
      title: 'ETL hattı hata oranını azaltma',
      summary: 'Monitoring uyarılarını incele ve yeniden deneme stratejisi tasarla.',
      description:
        'Atlas veri platformunda artan hata oranının kaynağı araştırılacak. Yeniden deneme politikaları ve alarmlar gözden geçirilerek hata oranının %50 azaltılması hedefleniyor.',
      status: 'review',
      priority: 'high',
      assignee: 'Emre Şahin',
      dueDate: '2024-05-20',
      tags: ['Veri', 'Altyapı'],
      checklist: [
        { id: 'chk-7', label: 'Hata loglarını grupla', done: true },
        { id: 'chk-8', label: 'Yeniden deneme stratejisini yaz', done: true },
        { id: 'chk-9', label: 'Load test sonuçlarını dokümante et', done: false },
      ],
    },
    {
      id: 'task-atlas-dashboard',
      projectId: 'proj-atlas',
      title: 'Yönetim panosu KPI yenilemesi',
      summary: 'Yeni veri kaynağına göre metrikleri güncelle.',
      description:
        'Yönetim panosuna eklenen yeni gelir metriğinin doğruluğu kontrol edilip panoya entegre edilecek. Paydaşlar için haftalık rapor otomasyonu planlanıyor.',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Ayşe Özkan',
      dueDate: '2024-06-05',
      tags: ['Raporlama', 'Strateji'],
      checklist: [
        { id: 'chk-10', label: 'Yeni metriği API’den çek', done: false },
        { id: 'chk-11', label: 'Doğruluk karşılaştırması yap', done: false },
        { id: 'chk-12', label: 'Otomasyon kurallarını belirle', done: false },
      ],
    },
    {
      id: 'task-vega-catalog',
      projectId: 'proj-vega',
      title: 'Tedarikçi katalog senkronizasyonu',
      summary: 'SKU içeriğini platforma otomatik aktarmak için entegrasyon kurgula.',
      description:
        'Yeni pazaryeri açılımında tedarikçi kataloglarının standartlaştırılması gerekiyor. SKU eşleştirme motoru güncellenecek ve veri doğrulama kuralları ekleniyor.',
      status: 'todo',
      priority: 'high',
      assignee: 'Can Polat',
      dueDate: '2024-06-12',
      tags: ['Entegrasyon', 'Büyüme'],
      checklist: [
        { id: 'chk-13', label: 'Veri sözlüğü güncelle', done: false },
        { id: 'chk-14', label: 'Yeni doğrulama kurallarını yaz', done: false },
        { id: 'chk-15', label: 'Pilot tedarikçi ile test et', done: false },
      ],
    },
    {
      id: 'task-vega-marketing',
      projectId: 'proj-vega',
      title: 'Pazaryeri lansman kampanyası',
      summary: 'Ürün pozisyonlamasını belirleyip lansman iletişimini hazırla.',
      description:
        'Kampanya planı, hedef kitle segmentleri ve teklif stratejisi belirlenecek. Marka ekibiyle birlikte medya planı finalize edilecek.',
      status: 'todo',
      priority: 'medium',
      assignee: 'Serra Arı',
      dueDate: '2024-06-28',
      tags: ['Pazarlama', 'Planlama'],
      checklist: [
        { id: 'chk-16', label: 'Segment bazlı mesajları yaz', done: false },
        { id: 'chk-17', label: 'Medya bütçe planını hazırla', done: false },
        { id: 'chk-18', label: 'Onay turunu organize et', done: false },
      ],
    },
  ];

  const actionItems = [
    {
      id: 'action-sprint-planning',
      title: 'Sprint planlama oturumunu doğrula',
      description: 'Yeni sprint backlog’u paydaşlarla gözden geçirin ve onay alın.',
      dueDate: '2024-05-21',
      priority: 'high',
      link: '#',
      completed: false,
    },
    {
      id: 'action-retro',
      title: 'Retro aksiyonlarını kapat',
      description: 'Önceki retrospektiften kalan aksiyon maddelerini takip et.',
      dueDate: '2024-05-23',
      priority: 'medium',
      link: '#',
      completed: false,
    },
    {
      id: 'action-demo',
      title: 'Müşteri demosu provasını yap',
      description: 'Demo senaryosunu ekip arkadaşlarınla prova ederek sürtünmeleri azalt.',
      dueDate: '2024-05-25',
      priority: 'medium',
      link: '#',
      completed: false,
    },
  ];

  const teamActivity = [
    {
      id: 'activity-1',
      owner: 'Selin Aydın',
      message: 'Aurora yol haritası sürüm tarihleri güncellendi.',
      timestamp: '2024-05-14T08:35:00+03:00',
    },
    {
      id: 'activity-2',
      owner: 'Emre Şahin',
      message: 'Atlas ETL hatası için kök neden analizi tamamlandı.',
      timestamp: '2024-05-13T17:05:00+03:00',
    },
    {
      id: 'activity-3',
      owner: 'Serra Arı',
      message: 'Vega lansman kampanyası medya planı taslağı paylaşıldı.',
      timestamp: '2024-05-13T11:20:00+03:00',
    },
    {
      id: 'activity-4',
      owner: 'Onur Demir',
      message: 'Kullanıcı görüşmelerinin ham kayıtları yüklendi.',
      timestamp: '2024-05-12T15:10:00+03:00',
    },
  ];

  const selectedProjectId = projects[0]?.id ?? null;
  const selectedTaskId = tasks.find((task) => task.projectId === selectedProjectId)?.id ?? null;

  return {
    theme,
    filters: {
      status: 'all',
      priority: 'all',
      search: '',
    },
    selectedProjectId,
    selectedTaskId,
    projects,
    tasks,
    actionItems,
    teamActivity,
    notifications: [],
  };
}

function mergeStates(defaultState, persistedState) {
  if (!persistedState) {
    return defaultState;
  }

  return {
    ...defaultState,
    ...persistedState,
    filters: {
      ...defaultState.filters,
      ...(persistedState.filters ?? {}),
    },
    projects: persistedState.projects ?? defaultState.projects,
    tasks: persistedState.tasks ?? defaultState.tasks,
    actionItems: persistedState.actionItems ?? defaultState.actionItems,
    teamActivity: persistedState.teamActivity ?? defaultState.teamActivity,
    notifications: persistedState.notifications ?? [],
  };
}

function formatDate(dateString, options = { day: '2-digit', month: 'short' }) {
  if (!dateString) {
    return '—';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', options);
}

function formatLongDate(dateString) {
  return formatDate(dateString, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTime(dateString) {
  if (!dateString) {
    return '—';
  }
  const date = new Date(dateString);
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function daysUntil(dateString) {
  if (!dateString) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function createStatusTag(status) {
  const option = STATUS_OPTIONS.find((item) => item.value === status);
  if (!option) {
    return { label: status, className: 'tag--todo' };
  }
  return { label: option.label, className: option.tagClass };
}

function createPriorityTag(priority) {
  const option = PRIORITY_OPTIONS.find((item) => item.value === priority);
  if (!option) {
    return { label: priority, className: 'tag--low' };
  }
  return { label: option.label, className: option.tagClass };
}

const NotificationCenter = (() => {
  let appInstance;
  let pointer = 0;
  let intervalId;
  const INTERVAL_MS = 45000;

  function init(app) {
    appInstance = app;
    restart();
  }

  function restart() {
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    intervalId = window.setInterval(() => {
      trigger();
    }, INTERVAL_MS);
  }

  function trigger() {
    if (!appInstance) {
      return;
    }
    const template = NOTIFICATION_TEMPLATES[pointer % NOTIFICATION_TEMPLATES.length];
    pointer += 1;
    const notification = {
      id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...template,
      createdAt: new Date().toISOString(),
    };
    appInstance.addNotification(notification);
  }

  function resetPointer() {
    pointer = 0;
  }

  return {
    init,
    trigger,
    restart,
    resetPointer,
  };
})();

const persisted = Storage.load();
const App = {
  state: mergeStates(createDefaultState(), persisted),
  visibleTasks: [],

  init() {
    this.cacheDom();
    this.bindEvents();
    this.persistState();
    this.applyTheme();
    this.updateCurrentYear();
    this.refreshUI();
    NotificationCenter.init(this);
  },

  cacheDom() {
    this.dom = {
      themeToggle: document.getElementById('themeToggle'),
      simulateNotification: document.getElementById('simulateNotification'),
      clearNotifications: document.getElementById('clearNotifications'),
      resetState: document.getElementById('resetState'),
      projectList: document.getElementById('projectList'),
      taskList: document.getElementById('taskList'),
      taskEmptyState: document.getElementById('taskEmptyState'),
      taskSearch: document.getElementById('taskSearch'),
      taskStatusFilter: document.getElementById('taskStatusFilter'),
      taskPriorityFilter: document.getElementById('taskPriorityFilter'),
      taskDetail: document.getElementById('taskDetail'),
      activityTimeline: document.getElementById('activityTimeline'),
      actionList: document.getElementById('actionList'),
      notificationList: document.getElementById('notificationList'),
      metricActiveTasks: document.getElementById('metricActiveTasks'),
      metricPendingReview: document.getElementById('metricPendingReview'),
      metricOverdue: document.getElementById('metricOverdue'),
      currentYear: document.getElementById('currentYear'),
    };
  },

  bindEvents() {
    this.dom.themeToggle?.addEventListener('click', () => {
      this.toggleTheme();
    });

    this.dom.simulateNotification?.addEventListener('click', () => {
      NotificationCenter.trigger();
    });

    this.dom.clearNotifications?.addEventListener('click', () => {
      this.clearNotifications();
    });

    this.dom.resetState?.addEventListener('click', () => {
      this.resetState();
    });

    this.dom.taskSearch?.addEventListener('input', (event) => {
      const value = event.target.value ?? '';
      this.updateFilters({ search: value });
    });

    this.dom.taskStatusFilter?.addEventListener('change', (event) => {
      this.updateFilters({ status: event.target.value });
    });

    this.dom.taskPriorityFilter?.addEventListener('change', (event) => {
      this.updateFilters({ priority: event.target.value });
    });

    this.dom.projectList?.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-project-id]');
      if (!button) {
        return;
      }
      this.selectProject(button.getAttribute('data-project-id'));
    });

    this.dom.taskList?.addEventListener('click', (event) => {
      const statusSelect = event.target.closest('select[data-task-id]');
      if (statusSelect) {
        return;
      }
      const card = event.target.closest('[data-task-id]');
      if (!card) {
        return;
      }
      this.selectTask(card.getAttribute('data-task-id'));
    });

    this.dom.taskList?.addEventListener('keydown', (event) => {
      if (!(event.key === 'Enter' || event.key === ' ')) {
        return;
      }
      const card = event.target.closest('[data-task-id]');
      if (!card) {
        return;
      }
      event.preventDefault();
      this.selectTask(card.getAttribute('data-task-id'));
    });

    this.dom.taskList?.addEventListener('change', (event) => {
      const statusSelect = event.target.closest('select[data-task-id]');
      if (!statusSelect) {
        return;
      }
      const taskId = statusSelect.getAttribute('data-task-id');
      const newStatus = statusSelect.value;
      this.updateTaskStatus(taskId, newStatus);
    });

    this.dom.actionList?.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action-id]');
      if (!button) {
        return;
      }
      const actionId = button.getAttribute('data-action-id');
      this.toggleActionItem(actionId);
    });
  },

  cloneState() {
    return {
      ...this.state,
      filters: { ...this.state.filters },
      projects: [...this.state.projects],
      tasks: this.state.tasks.map((task) => ({ ...task, checklist: task.checklist?.map((item) => ({ ...item })) })),
      actionItems: this.state.actionItems.map((item) => ({ ...item })),
      teamActivity: this.state.teamActivity.map((item) => ({ ...item })),
      notifications: this.state.notifications.map((item) => ({ ...item })),
    };
  },

  setState(updater) {
    const nextState =
      typeof updater === 'function' ? updater(this.cloneState()) : { ...this.cloneState(), ...updater };
    this.state = nextState;
    this.persistState();
    this.refreshUI();
  },

  persistState() {
    Storage.save(this.state);
  },

  toggleTheme() {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme });
    this.applyTheme();
  },

  applyTheme() {
    document.body.dataset.theme = this.state.theme;
    if (this.dom.themeToggle) {
      const isDark = this.state.theme === 'dark';
      this.dom.themeToggle.setAttribute('aria-pressed', String(isDark));
      this.dom.themeToggle.setAttribute('aria-label', `Tema: ${isDark ? 'Koyu' : 'Açık'}`);
    }
  },

  updateCurrentYear() {
    if (this.dom.currentYear) {
      this.dom.currentYear.textContent = new Date().getFullYear();
    }
  },

  refreshUI() {
    this.renderProjects();
    this.renderTasks();
    this.renderDetail();
    this.renderActivity();
    this.renderActionItems();
    this.renderMetrics();
    this.renderNotifications();
    this.applyTheme();
  },

  updateFilters(partial) {
    this.setState((state) => ({
      ...state,
      filters: {
        ...state.filters,
        ...partial,
      },
    }));
  },

  resetState() {
    const freshState = createDefaultState();
    this.state = mergeStates(freshState, null);
    this.persistState();
    NotificationCenter.resetPointer();
    NotificationCenter.restart();
    this.refreshUI();
  },

  selectProject(projectId) {
    if (!projectId || projectId === this.state.selectedProjectId) {
      return;
    }
    const firstTask = this.state.tasks.find((task) => task.projectId === projectId);
    this.setState({
      selectedProjectId: projectId,
      selectedTaskId: firstTask ? firstTask.id : null,
    });
  },

  selectTask(taskId) {
    if (!taskId || taskId === this.state.selectedTaskId) {
      return;
    }
    this.setState({ selectedTaskId: taskId });
  },

  updateTaskStatus(taskId, status) {
    const statusMeta = createStatusTag(status);
    this.setState((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              updatedAt: new Date().toISOString(),
            }
          : task,
      );

      const targetTask = tasks.find((task) => task.id === taskId);
      if (!targetTask) {
        return { ...state, tasks };
      }

      const activity = {
        id: `activity-${Date.now()}`,
        owner: targetTask.assignee,
        message: `${targetTask.title} görevi ${statusMeta.label.toLowerCase()} olarak güncellendi.`,
        timestamp: new Date().toISOString(),
      };

      const teamActivity = [activity, ...state.teamActivity].slice(0, 20);

      return {
        ...state,
        tasks,
        teamActivity,
      };
    });

    const updatedTask = this.state.tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      this.addNotification({
        id: `notif-status-${Date.now()}`,
        type: 'Durum',
        message: `${updatedTask.assignee}, “${updatedTask.title}” görevini ${statusMeta.label.toLowerCase()} olarak işaretledi.`,
        createdAt: new Date().toISOString(),
      });
    }
  },

  toggleActionItem(actionId) {
    this.setState((state) => {
      const actionItems = state.actionItems.map((item) =>
        item.id === actionId
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      );
      return {
        ...state,
        actionItems,
      };
    });
  },

  addNotification(notification) {
    this.setState((state) => {
      const notifications = [...state.notifications, notification].slice(-8);
      return {
        ...state,
        notifications,
      };
    });
  },

  clearNotifications() {
    this.setState((state) => ({
      ...state,
      notifications: [],
    }));
  },

  renderProjects() {
    if (!this.dom.projectList) {
      return;
    }

    const markup = this.state.projects
      .map((project) => {
        const tasks = this.state.tasks.filter((task) => task.projectId === project.id);
        const completed = tasks.filter((task) => task.status === 'done').length;
        const total = tasks.length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
        const active = total - completed;
        const health = PROJECT_HEALTH[project.health] ?? PROJECT_HEALTH['on-track'];
        const isActive = project.id === this.state.selectedProjectId;
        const dueDays = daysUntil(project.dueDate);
        const dueText =
          dueDays === null
            ? 'Takvimsiz'
            : dueDays < 0
            ? `${Math.abs(dueDays)} gün gecikti`
            : dueDays === 0
            ? 'Bugün'
            : `${dueDays} gün kaldı`;

        return `
          <li>
            <button
              type="button"
              class="project-card${isActive ? ' is-active' : ''}"
              data-project-id="${project.id}"
              aria-pressed="${isActive}"
            >
              <div class="project-card__top">
                <div>
                  <p class="project-card__name">${project.name}</p>
                  <p class="project-card__owner">Sorumlu: ${project.owner}</p>
                </div>
                <span class="project-card__status ${health.statusClass}">${health.label}</span>
              </div>
              <p class="project-card__summary">${project.summary}</p>
              <dl class="project-card__meta">
                <div>
                  <dt>Teslim</dt>
                  <dd>${formatDate(project.dueDate, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}</dd>
                </div>
                <div>
                  <dt>Kalan görev</dt>
                  <dd>${active}</dd>
                </div>
                <div>
                  <dt>Tamamlanan</dt>
                  <dd>${completed}</dd>
                </div>
                <div>
                  <dt>Süre</dt>
                  <dd>${dueText}</dd>
                </div>
              </dl>
              <div class="progress" role="presentation">
                <div class="progress__value" style="width: ${progress}%"></div>
              </div>
              <p class="project-card__progress-note">${progress}% tamamlandı</p>
            </button>
          </li>
        `;
      })
      .join('');

    this.dom.projectList.innerHTML = markup;
  },

  renderTasks() {
    if (!this.dom.taskList) {
      return;
    }

    const filters = this.state.filters;
    const tasks = this.state.tasks.filter((task) => {
      if (this.state.selectedProjectId && task.projectId !== this.state.selectedProjectId) {
        return false;
      }

      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }

      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }

      if (filters.search) {
        const term = filters.search.toLowerCase();
        const haystack = [task.title, task.summary, task.assignee, ...(task.tags ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(term)) {
          return false;
        }
      }

      return true;
    });

    this.visibleTasks = tasks;

    if (tasks.length === 0) {
      if (this.dom.taskEmptyState) {
        this.dom.taskEmptyState.hidden = false;
      }
    } else if (this.dom.taskEmptyState) {
      this.dom.taskEmptyState.hidden = true;
    }

    if (tasks.length === 0) {
      this.dom.taskList.innerHTML = '';
      this.state.selectedTaskId = null;
      this.persistState();
      return;
    }

    if (!tasks.some((task) => task.id === this.state.selectedTaskId)) {
      this.state.selectedTaskId = tasks[0].id;
      this.persistState();
    }

    const markup = tasks
      .map((task) => {
        const statusTag = createStatusTag(task.status);
        const priorityTag = createPriorityTag(task.priority);
        const isActive = task.id === this.state.selectedTaskId;
        const days = daysUntil(task.dueDate);
        const dueText =
          days === null
            ? 'Takvimsiz'
            : days < 0
            ? `${Math.abs(days)} gün gecikti`
            : days === 0
            ? 'Bugün teslim'
            : `${days} gün kaldı`;
        const checklistTotal = task.checklist?.length ?? 0;
        const checklistDone = task.checklist?.filter((item) => item.done).length ?? 0;

        return `
          <li>
            <article
              class="task-card${isActive ? ' is-active' : ''}"
              data-task-id="${task.id}"
              role="button"
              tabindex="0"
              aria-pressed="${isActive}"
            >
              <header class="task-card__header">
                <div>
                  <h3 class="task-card__title">${task.title}</h3>
                  <div class="task-card__meta">
                    <span class="task-card__meta-item" aria-label="Sorumlu">
                      👤 ${task.assignee}
                    </span>
                    <span class="task-card__meta-item" aria-label="Teslim tarihi">
                      📅 ${formatDate(task.dueDate)}
                    </span>
                    <span class="task-card__meta-item">${dueText}</span>
                    ${
                      checklistTotal > 0
                        ? `<span class="task-card__meta-item">Kontrol: ${checklistDone}/${checklistTotal}</span>`
                        : ''
                    }
                  </div>
                </div>
                <span class="tag ${statusTag.className}">${statusTag.label}</span>
              </header>
              <p>${task.summary}</p>
              <div class="task-card__labels">
                <span class="tag ${priorityTag.className}">${priorityTag.label}</span>
                ${(task.tags ?? [])
                  .map((tag) => `<span class="task-card__chip">${tag}</span>`)
                  .join('')}
              </div>
              <div class="task-card__actions">
                <label>
                  <span>Durum</span>
                  <select data-task-id="${task.id}" data-role="status-select" aria-label="${task.title} için durum">
                    ${STATUS_OPTIONS.map(
                      (option) =>
                        `<option value="${option.value}"${option.value === task.status ? ' selected' : ''}>${option.label}</option>`,
                    ).join('')}
                  </select>
                </label>
              </div>
            </article>
          </li>
        `;
      })
      .join('');

    this.dom.taskList.innerHTML = markup;
  },

  renderDetail() {
    if (!this.dom.taskDetail) {
      return;
    }

    const task = this.state.tasks.find((item) => item.id === this.state.selectedTaskId);

    if (!task) {
      this.dom.taskDetail.innerHTML = `
        <div class="detail-panel__empty">
          <h3>Bir görev seçin</h3>
          <p>Sol taraftaki listeden bir görev seçtiğinizde detaylar burada görünür.</p>
        </div>
      `;
      return;
    }

    const statusTag = createStatusTag(task.status);
    const priorityTag = createPriorityTag(task.priority);
    const checklistTotal = task.checklist?.length ?? 0;
    const checklistDone = task.checklist?.filter((item) => item.done).length ?? 0;

    const checklistMarkup = checklistTotal
      ? `
        <section class="detail-panel__section">
          <header class="detail-panel__section-header">
            <h4>Kontrol Listesi</h4>
            <span>${checklistDone}/${checklistTotal}</span>
          </header>
          <ul class="checklist">
            ${task.checklist
              .map(
                (item) => `
                  <li>
                    <input type="checkbox" ${item.done ? 'checked' : ''} disabled aria-label="${item.label}" />
                    <span>${item.label}</span>
                  </li>
                `,
              )
              .join('')}
          </ul>
        </section>
      `
      : '';

    const tagsMarkup = (task.tags ?? []).length
      ? `
        <section class="detail-panel__section">
          <h4>Etiketler</h4>
          <div class="detail-panel__tags">
            ${task.tags.map((tag) => `<span class="task-card__chip">${tag}</span>`).join('')}
          </div>
        </section>
      `
      : '';

    this.dom.taskDetail.innerHTML = `
      <header class="detail-panel__header">
        <span class="tag ${statusTag.className}">${statusTag.label}</span>
        <h3 class="detail-panel__title">${task.title}</h3>
        <div class="detail-panel__meta">
          <div class="detail-panel__meta-item">
            <span class="detail-panel__meta-label">Sorumlu</span>
            <span class="detail-panel__meta-value">${task.assignee}</span>
          </div>
          <div class="detail-panel__meta-item">
            <span class="detail-panel__meta-label">Öncelik</span>
            <span class="detail-panel__meta-value tag ${priorityTag.className}">${priorityTag.label}</span>
          </div>
          <div class="detail-panel__meta-item">
            <span class="detail-panel__meta-label">Teslim tarihi</span>
            <span class="detail-panel__meta-value">${formatLongDate(task.dueDate)}</span>
          </div>
        </div>
      </header>
      <section class="detail-panel__section detail-panel__description">
        <h4>Tanım</h4>
        <p>${task.description}</p>
      </section>
      ${checklistMarkup}
      ${tagsMarkup}
    `;
  },

  renderActivity() {
    if (!this.dom.activityTimeline) {
      return;
    }

    const markup = this.state.teamActivity
      .map(
        (activity) => `
          <li class="activity-item">
            <time datetime="${activity.timestamp}">${formatDateTime(activity.timestamp)}</time>
            <strong>${activity.owner}</strong>
            <p>${activity.message}</p>
          </li>
        `,
      )
      .join('');

    this.dom.activityTimeline.innerHTML = markup;
  },

  renderActionItems() {
    if (!this.dom.actionList) {
      return;
    }

    if (this.state.actionItems.length === 0) {
      this.dom.actionList.innerHTML = '<li class="notification-item notification-item--empty">Aksiyon öğesi bulunmuyor.</li>';
      return;
    }

    const markup = this.state.actionItems
      .map((item) => {
        const priorityTag = createPriorityTag(item.priority);
        return `
          <li>
            <article class="action-card${item.completed ? ' is-complete' : ''}" data-action-id="${item.id}">
              <div class="action-card__header">
                <div>
                  <p class="action-card__title">${item.title}</p>
                  <p>${item.description}</p>
                </div>
                <span class="action-card__due">${formatDate(item.dueDate, {
                  day: '2-digit',
                  month: 'short',
                })}</span>
              </div>
              <div class="action-card__footer">
                <span class="tag ${priorityTag.className}">${priorityTag.label}</span>
                <button
                  type="button"
                  class="button button--ghost button--small"
                  data-action-id="${item.id}"
                >
                  ${item.completed ? 'Geri Al' : 'Tamamlandı'}
                </button>
              </div>
            </article>
          </li>
        `;
      })
      .join('');

    this.dom.actionList.innerHTML = markup;
  },

  renderMetrics() {
    const tasks = this.state.tasks;
    const active = tasks.filter((task) => task.status !== 'done').length;
    const pendingReview = tasks.filter((task) => task.status === 'review').length;
    const overdue = tasks.filter((task) => {
      const days = daysUntil(task.dueDate);
      return typeof days === 'number' && days < 0 && task.status !== 'done';
    }).length;

    if (this.dom.metricActiveTasks) {
      this.dom.metricActiveTasks.textContent = active;
    }
    if (this.dom.metricPendingReview) {
      this.dom.metricPendingReview.textContent = pendingReview;
    }
    if (this.dom.metricOverdue) {
      this.dom.metricOverdue.textContent = overdue;
    }
  },

  renderNotifications() {
    if (!this.dom.notificationList) {
      return;
    }

    if (this.state.notifications.length === 0) {
      this.dom.notificationList.innerHTML =
        '<li class="notification-item notification-item--empty">Henüz bildirim yok.</li>';
      return;
    }

    const markup = this.state.notifications
      .slice()
      .reverse()
      .map(
        (item) => `
          <li class="notification-item">
            <div class="notification-item__meta">
              <span class="notification-item__type">${item.type}</span>
              <time datetime="${item.createdAt}">${formatDateTime(item.createdAt)}</time>
            </div>
            <p>${item.message}</p>
          </li>
        `,
      )
      .join('');

    this.dom.notificationList.innerHTML = markup;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

