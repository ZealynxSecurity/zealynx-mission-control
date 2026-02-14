-- Zealynx Mission Control Database Schema
-- Following Matthew Berman's hybrid SQL + vector pattern
-- PostgreSQL with pgvector extension for semantic search

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- Create base tables with hybrid SQL + vector columns

-- 1. Telegram Conversations Table
CREATE TABLE telegram_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core Telegram data
  telegram_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  username TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Act ZLX clie', 'Pot ZLX clie', 'BD', 'Immunefi', 
    'Enreach lead', 'Audits', 'Team', 'Other', 'Spam'
  )),
  
  -- Communication data
  last_message TEXT,
  last_activity TIMESTAMP WITH TIME ZONE NOT NULL,
  unread_count INTEGER DEFAULT 0,
  priority_score INTEGER DEFAULT 0 CHECK (priority_score >= 0 AND priority_score <= 100),
  is_bot BOOLEAN DEFAULT FALSE,
  chat_type TEXT NOT NULL CHECK (chat_type IN ('user', 'group', 'channel')),
  
  -- Rich metadata
  conversation_data JSONB DEFAULT '{}',
  
  -- Vector column for semantic search (Matthew's pattern)
  embedding vector(1536)
);

-- 2. Deals Table (CRM Pipeline)
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core deal data
  title TEXT NOT NULL,
  company TEXT,
  stage TEXT NOT NULL CHECK (stage IN (
    'prospects', 'qualification', 'proposal', 
    'negotiation', 'closed-won', 'closed-lost'
  )),
  value DECIMAL(10,2),
  probability DECIMAL(3,2) CHECK (probability >= 0 AND probability <= 1),
  description TEXT,
  
  -- Contact information
  contact_name TEXT,
  contact_email TEXT,
  last_contact TIMESTAMP WITH TIME ZONE,
  source TEXT NOT NULL CHECK (source IN (
    'telegram', 'enreach', 'referral', 
    'twitter', 'cold-outreach', 'partnership'
  )),
  
  -- Rich metadata
  deal_data JSONB DEFAULT '{}',
  
  -- Vector column for semantic search
  embedding vector(1536)
);

-- 3. Tasks Table (Calendar & Automation)
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core task data
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN (
    'meeting', 'follow-up', 'proposal', 'audit', 
    'review', 'cron', 'reminder', 'contract', 'payment'
  )),
  status TEXT NOT NULL CHECK (status IN (
    'pending', 'in-progress', 'completed', 'overdue', 'cancelled'
  )),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Assignment and timing
  assigned_to TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Relationships
  related_deal_id UUID REFERENCES deals(id),
  related_conversation_id UUID REFERENCES telegram_conversations(id),
  
  -- Rich metadata
  task_data JSONB DEFAULT '{}',
  
  -- Vector column for semantic search
  embedding vector(1536)
);

-- 4. Contacts Table (Personal CRM like Matthew)
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core contact data
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  role TEXT,
  telegram_username TEXT,
  linkedin_url TEXT,
  
  -- Interaction tracking
  last_interaction TIMESTAMP WITH TIME ZONE NOT NULL,
  interaction_count INTEGER DEFAULT 1,
  contact_type TEXT NOT NULL CHECK (contact_type IN (
    'client', 'prospect', 'partner', 'vendor', 'team', 'investor'
  )),
  
  -- Rich metadata
  contact_data JSONB DEFAULT '{}',
  
  -- Vector column for semantic search
  embedding vector(1536)
);

-- 5. Enreach Campaigns Table
CREATE TABLE enreach_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Campaign details
  campaign_name TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('telegram', 'linkedin', 'email')),
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'completed')),
  
  -- Performance metrics
  targets_total INTEGER DEFAULT 0,
  targets_contacted INTEGER DEFAULT 0,
  responses_received INTEGER DEFAULT 0,
  leads_qualified INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,4) DEFAULT 0,
  
  -- Rich metadata
  campaign_data JSONB DEFAULT '{}',
  
  -- Vector column for semantic search
  embedding vector(1536)
);

-- 6. Business Metrics Table (Time series)
CREATE TABLE business_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core business metrics
  revenue_ytd DECIMAL(12,2) DEFAULT 0,
  active_clients INTEGER DEFAULT 0,
  pipeline_value DECIMAL(12,2) DEFAULT 0,
  conversion_rate DECIMAL(5,4) DEFAULT 0,
  
  -- Communication metrics
  telegram_conversations INTEGER DEFAULT 0,
  urgent_conversations INTEGER DEFAULT 0,
  
  -- Campaign metrics
  enreach_campaigns INTEGER DEFAULT 0,
  
  -- Deal stage distribution
  deals_by_stage JSONB DEFAULT '{}',
  
  -- Growth metrics
  monthly_growth_rate DECIMAL(5,4) DEFAULT 0,
  system_health TEXT DEFAULT 'healthy' CHECK (system_health IN ('healthy', 'warning', 'critical'))
);

-- Create indexes for performance (Matthew's optimization patterns)

-- Traditional SQL indexes
CREATE INDEX idx_telegram_conversations_category ON telegram_conversations(category);
CREATE INDEX idx_telegram_conversations_priority ON telegram_conversations(priority_score DESC);
CREATE INDEX idx_telegram_conversations_activity ON telegram_conversations(last_activity DESC);
CREATE INDEX idx_telegram_conversations_unread ON telegram_conversations(unread_count DESC);

CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_source ON deals(source);
CREATE INDEX idx_deals_value ON deals(value DESC);
CREATE INDEX idx_deals_probability ON deals(probability DESC);
CREATE INDEX idx_deals_updated ON deals(updated_at DESC);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);

CREATE INDEX idx_contacts_type ON contacts(contact_type);
CREATE INDEX idx_contacts_interaction ON contacts(last_interaction DESC);
CREATE INDEX idx_contacts_email ON contacts(email);

CREATE INDEX idx_enreach_campaigns_status ON enreach_campaigns(status);
CREATE INDEX idx_enreach_campaigns_platform ON enreach_campaigns(platform);
CREATE INDEX idx_enreach_campaigns_conversion ON enreach_campaigns(conversion_rate DESC);

CREATE INDEX idx_business_metrics_date ON business_metrics(date DESC);

-- Vector indexes for semantic search (Matthew's key innovation)
CREATE INDEX idx_telegram_conversations_embedding ON telegram_conversations 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  
CREATE INDEX idx_deals_embedding ON deals 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  
CREATE INDEX idx_tasks_embedding ON tasks 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  
CREATE INDEX idx_contacts_embedding ON contacts 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  
CREATE INDEX idx_enreach_campaigns_embedding ON enreach_campaigns 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Full-text search indexes (hybrid approach)
CREATE INDEX idx_telegram_conversations_text ON telegram_conversations 
  USING gin(to_tsvector('english', name || ' ' || COALESCE(last_message, '')));
  
CREATE INDEX idx_deals_text ON deals 
  USING gin(to_tsvector('english', title || ' ' || COALESCE(company, '') || ' ' || COALESCE(description, '')));

-- Update triggers to maintain updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_telegram_conversations_updated_at 
  BEFORE UPDATE ON telegram_conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at 
  BEFORE UPDATE ON deals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at 
  BEFORE UPDATE ON tasks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at 
  BEFORE UPDATE ON contacts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enreach_campaigns_updated_at 
  BEFORE UPDATE ON enreach_campaigns 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE telegram_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY; 
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enreach_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_metrics ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (authenticated users only)
CREATE POLICY "authenticated_access" ON telegram_conversations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_access" ON deals
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_access" ON tasks
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_access" ON contacts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_access" ON enreach_campaigns
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_access" ON business_metrics
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Semantic search functions (Matthew's natural language query system)
CREATE OR REPLACE FUNCTION search_conversations(
  query_text TEXT,
  query_embedding vector(1536) DEFAULT NULL,
  limit_count INTEGER DEFAULT 10,
  similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE(
  id UUID,
  name TEXT,
  category TEXT,
  last_message TEXT,
  similarity FLOAT
) AS $$
BEGIN
  IF query_embedding IS NOT NULL THEN
    -- Vector similarity search
    RETURN QUERY
    SELECT 
      tc.id,
      tc.name,
      tc.category,
      tc.last_message,
      (1 - (tc.embedding <=> query_embedding))::FLOAT as similarity
    FROM telegram_conversations tc
    WHERE tc.embedding IS NOT NULL
      AND (1 - (tc.embedding <=> query_embedding)) > similarity_threshold
    ORDER BY tc.embedding <=> query_embedding
    LIMIT limit_count;
  ELSE
    -- Fallback to full-text search
    RETURN QUERY
    SELECT 
      tc.id,
      tc.name,
      tc.category,
      tc.last_message,
      ts_rank(to_tsvector('english', tc.name || ' ' || COALESCE(tc.last_message, '')), 
               plainto_tsquery('english', query_text))::FLOAT as similarity
    FROM telegram_conversations tc
    WHERE to_tsvector('english', tc.name || ' ' || COALESCE(tc.last_message, '')) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY similarity DESC
    LIMIT limit_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Similar functions for other tables...
CREATE OR REPLACE FUNCTION search_deals(
  query_text TEXT,
  query_embedding vector(1536) DEFAULT NULL,
  limit_count INTEGER DEFAULT 10,
  similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  company TEXT,
  stage TEXT,
  value DECIMAL,
  similarity FLOAT
) AS $$
BEGIN
  IF query_embedding IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      d.id,
      d.title,
      d.company,
      d.stage,
      d.value,
      (1 - (d.embedding <=> query_embedding))::FLOAT as similarity
    FROM deals d
    WHERE d.embedding IS NOT NULL
      AND (1 - (d.embedding <=> query_embedding)) > similarity_threshold
    ORDER BY d.embedding <=> query_embedding
    LIMIT limit_count;
  ELSE
    RETURN QUERY
    SELECT 
      d.id,
      d.title,
      d.company,
      d.stage,
      d.value,
      ts_rank(to_tsvector('english', d.title || ' ' || COALESCE(d.company, '') || ' ' || COALESCE(d.description, '')), 
               plainto_tsquery('english', query_text))::FLOAT as similarity
    FROM deals d
    WHERE to_tsvector('english', d.title || ' ' || COALESCE(d.company, '') || ' ' || COALESCE(d.description, '')) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY similarity DESC
    LIMIT limit_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert initial business metrics
INSERT INTO business_metrics (
  date, 
  revenue_ytd, 
  active_clients, 
  pipeline_value, 
  conversion_rate,
  telegram_conversations,
  urgent_conversations,
  enreach_campaigns,
  deals_by_stage,
  monthly_growth_rate,
  system_health
) VALUES (
  CURRENT_DATE,
  133470.00,
  12,
  485000.00,
  0.15,
  195,
  3,
  24,
  '{"prospects": 15, "qualification": 8, "proposal": 12, "negotiation": 5, "closed-won": 10, "closed-lost": 2}'::JSONB,
  0.08,
  'healthy'
) ON CONFLICT (date) DO UPDATE SET
  revenue_ytd = EXCLUDED.revenue_ytd,
  active_clients = EXCLUDED.active_clients,
  pipeline_value = EXCLUDED.pipeline_value,
  conversion_rate = EXCLUDED.conversion_rate,
  telegram_conversations = EXCLUDED.telegram_conversations,
  urgent_conversations = EXCLUDED.urgent_conversations,
  enreach_campaigns = EXCLUDED.enreach_campaigns,
  deals_by_stage = EXCLUDED.deals_by_stage,
  monthly_growth_rate = EXCLUDED.monthly_growth_rate,
  system_health = EXCLUDED.system_health;