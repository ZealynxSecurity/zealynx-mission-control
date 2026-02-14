// Zealynx Mission Control - Database Types
// Following Matthew Berman's hybrid SQL + vector pattern

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  embedding?: number[]; // OpenAI embeddings for semantic search
}

// Telegram Management Types
export interface TelegramConversation extends BaseEntity {
  telegram_id: string;
  name: string;
  username?: string;
  category: TelegramCategory;
  last_message?: string;
  last_activity: string;
  unread_count: number;
  priority_score: number; // 0-100 AI-calculated priority
  is_bot: boolean;
  chat_type: 'user' | 'group' | 'channel';
  conversation_data: {
    total_messages: number;
    avg_response_time?: number;
    sentiment_score?: number; // -1 to 1
    business_context?: string;
  };
}

export type TelegramCategory = 
  | 'Act ZLX clie'   // Active Zealynx clients
  | 'Pot ZLX clie'   // Potential Zealynx clients  
  | 'BD'             // Business Development
  | 'Immunefi'       // Immunefi platform
  | 'Enreach lead'   // Enreach generated leads
  | 'Audits'         // Active audit discussions
  | 'Team'           // Team conversations
  | 'Other'          // Other conversations
  | 'Spam';          // Spam/irrelevant

// CRM & Deals Types  
export interface Deal extends BaseEntity {
  title: string;
  company?: string;
  stage: DealStage;
  value?: number;
  probability: number; // 0-1
  description?: string;
  contact_name?: string;
  contact_email?: string;
  last_contact?: string;
  source: DealSource;
  deal_data: {
    audit_type?: string;
    timeline_weeks?: number;
    complexity_score?: number;
    contract_signed?: boolean;
    payment_terms?: string;
  };
}

export type DealStage = 
  | 'prospects' 
  | 'qualification' 
  | 'proposal' 
  | 'negotiation' 
  | 'closed-won' 
  | 'closed-lost';

export type DealSource = 
  | 'telegram' 
  | 'enreach' 
  | 'referral' 
  | 'twitter' 
  | 'cold-outreach' 
  | 'partnership';

// Enreach Integration Types
export interface EnreachCampaign extends BaseEntity {
  campaign_name: string;
  agent_name: string;
  platform: 'telegram' | 'linkedin' | 'email';
  status: 'active' | 'paused' | 'completed';
  targets_total: number;
  targets_contacted: number;
  responses_received: number;
  leads_qualified: number;
  conversion_rate: number;
  campaign_data: {
    start_date: string;
    end_date?: string;
    message_template: string;
    targeting_criteria: string;
    cost_per_lead?: number;
  };
}

// Calendar & Task Types
export interface Task extends BaseEntity {
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: string;
  due_date?: string;
  completed_at?: string;
  related_deal_id?: string;
  related_conversation_id?: string;
  task_data: {
    estimated_hours?: number;
    actual_hours?: number;
    blockers?: string[];
    progress_notes?: string;
  };
}

export type TaskType = 
  | 'meeting' 
  | 'follow-up' 
  | 'proposal' 
  | 'audit' 
  | 'review' 
  | 'cron' 
  | 'reminder'
  | 'contract'
  | 'payment';

export type TaskStatus = 
  | 'pending' 
  | 'in-progress' 
  | 'completed' 
  | 'overdue' 
  | 'cancelled';

export type TaskPriority = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'urgent';

// Business Intelligence Types (Matthew's Meta Analysis)
export interface BusinessMetrics {
  date: string;
  revenue_ytd: number;
  active_clients: number;
  pipeline_value: number;
  conversion_rate: number;
  telegram_conversations: number;
  urgent_conversations: number;
  enreach_campaigns: number;
  deals_by_stage: Record<DealStage, number>;
  monthly_growth_rate: number;
  system_health: 'healthy' | 'warning' | 'critical';
}

// Contact Management (Personal CRM like Matthew)
export interface Contact extends BaseEntity {
  name: string;
  email?: string;
  company?: string;
  role?: string;
  telegram_username?: string;
  linkedin_url?: string;
  last_interaction: string;
  interaction_count: number;
  contact_type: ContactType;
  contact_data: {
    sentiment_score?: number;
    business_value?: number; // 1-10
    communication_frequency?: number;
    preferred_contact_method?: string;
    notes?: string;
  };
}

export type ContactType = 
  | 'client' 
  | 'prospect' 
  | 'partner' 
  | 'vendor' 
  | 'team' 
  | 'investor';

// Semantic Search Types (Matthew's Knowledge Base)
export interface SemanticSearchResult {
  id: string;
  content: string;
  source_type: 'conversation' | 'deal' | 'task' | 'contact';
  source_id: string;
  relevance_score: number;
  metadata: Record<string, any>;
}

export interface EmbeddingUpdate {
  table_name: string;
  record_id: string;
  content: string;
  embedding: number[];
}

// Dashboard State Types
export interface DashboardState {
  overview: {
    metrics: BusinessMetrics;
    last_updated: string;
  };
  telegram: {
    conversations: TelegramConversation[];
    categories: Record<TelegramCategory, number>;
    urgent_count: number;
  };
  crm: {
    deals: Deal[];
    pipeline_value: number;
    stage_distribution: Record<DealStage, number>;
  };
  calendar: {
    tasks: Task[];
    upcoming_deadlines: Task[];
    overdue_count: number;
  };
  system_status: {
    integrations: Record<string, boolean>;
    last_sync: Record<string, string>;
    errors: string[];
  };
}