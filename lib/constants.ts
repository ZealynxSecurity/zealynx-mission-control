// Zealynx Mission Control - Constants and Configuration

export const ZEALYNX_BRAND = {
  name: 'Zealynx Security',
  tagline: 'Protecting the builders of Web3',
  colors: {
    primary: '#13B7C1',    // Main teal
    secondary: '#63dbe5',  // Light teal  
    dark: '#0c7c84',       // Dark teal
    accent: '#39bef0',     // Blue accent
  },
  emoji: '🔐',
  avatar: '/zealynx-logo.png',
};

// Current Business Metrics (2026 YTD - Real Data)
export const CURRENT_BUSINESS_METRICS = {
  revenue_ytd: 133470,
  active_clients: 12,
  clients_audited: 30,
  pipeline_value: 485000,
  conversion_rate: 0.15,
  telegram_conversations: 195,
  monthly_growth_rate: 0.08,
  avg_deal_size: 15000,
  avg_audit_duration: 3, // weeks
};

// Telegram Configuration (Carlos's actual setup)
export const TELEGRAM_CONFIG = {
  categories: [
    'Act ZLX clie',   // Active clients - highest priority
    'Pot ZLX clie',   // Potential clients
    'Enreach lead',   // Enreach generated leads
    'BD',             // Business development
    'Audits',         // Active audit discussions
    'Immunefi',       // Immunefi platform
    'Team',           // Team conversations  
    'Other',          // Uncategorized
    'Spam',           // Spam/irrelevant
  ] as const,
  
  urgency_thresholds: {
    high_priority_categories: ['Act ZLX clie', 'Audits'],
    max_response_hours: 4,
    urgent_keywords: ['urgent', 'asap', 'deadline', 'emergency', 'issue'],
  },
  
  chat_folders: [
    'Act ZLX clie',
    'Enreach lead', 
    'Pot ZLX clie',
    'Audits',
    'Audit provid',
    'BD',
    'Leads Sam',
    'Zealynx',
    'Solana SRs',
    'Web2 SRs',
    'Solidity SRs',
    'Sway SRs',
    'Old ZLX clie',
    'PSHV-A-G',
    'Solidity-dev',
    'Solana-dev', 
    'Backend dev',
    'Python Audit',
    'NEAR SRs',
  ] as const,
};

// CRM Pipeline Configuration
export const CRM_CONFIG = {
  deal_stages: [
    { key: 'prospects', label: 'Prospects', color: 'slate' },
    { key: 'qualification', label: 'Qualification', color: 'amber' },
    { key: 'proposal', label: 'Proposal', color: 'blue' },
    { key: 'negotiation', label: 'Negotiation', color: 'violet' },
    { key: 'closed-won', label: 'Closed Won', color: 'emerald' },
    { key: 'closed-lost', label: 'Closed Lost', color: 'rose' },
  ] as const,
  
  deal_sources: [
    'telegram',
    'enreach', 
    'referral',
    'twitter',
    'cold-outreach',
    'partnership',
  ] as const,
  
  default_probability: {
    prospects: 0.1,
    qualification: 0.25,
    proposal: 0.5,
    negotiation: 0.75,
  },
  
  autonomous_actions: {
    auto_move_to_proposal: true,        // Move qualified leads to proposal
    auto_close_completed: true,         // Close completed tasks
    auto_create_follow_ups: true,       // Create follow-up tasks
    max_days_in_stage: {
      prospects: 30,
      qualification: 14,
      proposal: 21,
      negotiation: 14,
    },
  },
};

// Enreach Integration Configuration
export const ENREACH_CONFIG = {
  agents: [
    { name: 'Alessandro', platform: 'telegram' },
    { name: 'Aliza', platform: 'linkedin' },
    { name: 'Zofia', platform: 'email' },
    { name: 'Anna', platform: 'telegram' },
    { name: 'Francesco', platform: 'linkedin' },
    { name: 'Erik', platform: 'email' },
    { name: 'Thomas', platform: 'telegram' },
    { name: 'Andrei', platform: 'linkedin' },
    { name: 'David', platform: 'email' },
  ] as const,
  
  campaign_types: [
    'cold-outreach',
    'follow-up',
    'partnership',
    'content-promotion',
    're-engagement',
  ] as const,
  
  success_metrics: {
    min_response_rate: 0.05,     // 5% minimum response rate
    target_conversion: 0.02,      // 2% target lead conversion
    cost_per_lead: 50,           // $50 max cost per qualified lead
  },
};

// Calendar & Task Configuration  
export const CALENDAR_CONFIG = {
  task_types: [
    { key: 'meeting', label: 'Meeting', icon: '📅' },
    { key: 'follow-up', label: 'Follow-up', icon: '📞' },
    { key: 'proposal', label: 'Proposal', icon: '📄' },
    { key: 'audit', label: 'Audit Work', icon: '🔍' },
    { key: 'review', label: 'Review', icon: '👀' },
    { key: 'cron', label: 'Automation', icon: '⚙️' },
    { key: 'reminder', label: 'Reminder', icon: '⏰' },
    { key: 'contract', label: 'Contract', icon: '📋' },
    { key: 'payment', label: 'Payment', icon: '💰' },
  ] as const,
  
  priority_levels: [
    { key: 'low', label: 'Low', color: 'slate' },
    { key: 'medium', label: 'Medium', color: 'amber' },
    { key: 'high', label: 'High', color: 'orange' },
    { key: 'urgent', label: 'Urgent', color: 'red' },
  ] as const,
  
  cron_schedules: {
    telegram_scan: 'every 15 minutes',
    email_ingestion: 'daily at 6:00 AM',
    pipeline_review: 'daily at 9:00 AM',
    business_report: 'daily at 11:00 PM',
    backup: 'every 6 hours',
  },
};

// API Configuration
export const API_CONFIG = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    service_role_key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  openai: {
    api_key: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    model: 'text-embedding-ada-002',
    embedding_dimensions: 1536,
  },
  
  telegram: {
    bot_token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
    api_url: 'https://api.telegram.org/bot',
  },
  
  enreach: {
    api_key: process.env.NEXT_PUBLIC_ENREACH_API_KEY,
    base_url: 'https://api.enreach.ai/v1',
  },
  
  google: {
    client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
  },
  
  refresh_intervals: {
    overview: 30000,      // 30 seconds
    telegram: 15000,      // 15 seconds  
    enreach: 300000,      // 5 minutes
    calendar: 60000,      // 1 minute
    real_time: 5000,      // 5 seconds for critical updates
  },
};

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  components: [
    { 
      key: 'overview', 
      title: 'Overview', 
      description: 'Business metrics and system status',
      icon: '📊',
      route: '/',
    },
    { 
      key: 'telegram', 
      title: 'Telegram Management', 
      description: '195+ conversations with AI categorization',
      icon: '💬',
      route: '/telegram',
    },
    { 
      key: 'enreach', 
      title: 'Enreach Dashboard', 
      description: 'Campaign analytics and lead tracking',
      icon: '🚀',
      route: '/enreach',
    },
    { 
      key: 'crm', 
      title: 'CRM Pipeline', 
      description: 'Deal management with autonomous actions',
      icon: '🤝',
      route: '/crm',
    },
    { 
      key: 'calendar', 
      title: 'Calendar & Crons', 
      description: 'Schedule management and automation',
      icon: '📅',
      route: '/calendar',
    },
  ] as const,
  
  mobile_breakpoints: {
    sm: 640,
    md: 768, 
    lg: 1024,
    xl: 1280,
  },
  
  animations: {
    page_transition: 'slide-up',
    stagger_delay: 100, // ms
    loading_duration: 300,
  },
};

// Natural Language Query Examples (Matthew's Knowledge Base)
export const QUERY_EXAMPLES = [
  {
    category: 'telegram',
    queries: [
      'Show me frustrated Telegram clients needing follow-up',
      'Which conversations mentioned timeline concerns recently?',
      'Find all Solana-related discussions from this week',
      'Who are my most engaged potential clients?',
    ],
  },
  {
    category: 'deals', 
    queries: [
      'Which deals are stuck in qualification stage?',
      'Show me high-value deals closing this month',
      'Find deals with payment concerns or budget issues', 
      'What audit types are most requested?',
    ],
  },
  {
    category: 'tasks',
    queries: [
      'Show me overdue tasks and upcoming deadlines',
      'Which proposals need to be sent this week?',
      'Find all contract-related tasks',
      'What follow-ups are pending from last month?',
    ],
  },
  {
    category: 'business',
    queries: [
      'Analyze my revenue trends and growth patterns',
      'Which lead sources convert best?',
      'Show me client satisfaction indicators',
      'What are my biggest pipeline risks?',
    ],
  },
] as const;

// System Health Monitoring
export const HEALTH_CONFIG = {
  critical_services: [
    'supabase_connection',
    'telegram_api',
    'enreach_api', 
    'openai_embeddings',
    'google_calendar',
  ] as const,
  
  health_check_interval: 60000, // 1 minute
  
  alert_thresholds: {
    response_time_ms: 5000,
    error_rate_percent: 5,
    uptime_percent: 99.5,
  },
  
  backup_schedule: {
    database: 'every 6 hours',
    files: 'daily',
    config: 'on change',
  },
};