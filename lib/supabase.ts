import { createClient } from '@supabase/supabase-js';
import type { 
  TelegramConversation, 
  Deal, 
  Task, 
  Contact, 
  EnreachCampaign, 
  BusinessMetrics 
} from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database interface following Matthew's hybrid pattern
export interface Database {
  public: {
    Tables: {
      telegram_conversations: {
        Row: TelegramConversation;
        Insert: Omit<TelegramConversation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TelegramConversation, 'id' | 'created_at'>>;
      };
      deals: {
        Row: Deal;
        Insert: Omit<Deal, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Deal, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
      contacts: {
        Row: Contact;
        Insert: Omit<Contact, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Contact, 'id' | 'created_at'>>;
      };
      enreach_campaigns: {
        Row: EnreachCampaign;
        Insert: Omit<EnreachCampaign, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<EnreachCampaign, 'id' | 'created_at'>>;
      };
      business_metrics: {
        Row: BusinessMetrics;
        Insert: Omit<BusinessMetrics, 'id'>;
        Update: Partial<Omit<BusinessMetrics, 'id' | 'date'>>;
      };
    };
    Functions: {
      search_conversations: {
        Args: {
          query_text: string;
          query_embedding?: number[];
          limit_count?: number;
          similarity_threshold?: number;
        };
        Returns: {
          id: string;
          name: string;
          category: string;
          last_message: string;
          similarity: number;
        }[];
      };
      search_deals: {
        Args: {
          query_text: string;
          query_embedding?: number[];
          limit_count?: number;
          similarity_threshold?: number;
        };
        Returns: {
          id: string;
          title: string;
          company: string;
          stage: string;
          value: number;
          similarity: number;
        }[];
      };
    };
  };
}

// Helper functions for semantic search (Matthew's pattern)
export async function generateEmbedding(text: string): Promise<number[]> {
  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Conversation search with semantic capabilities
export async function searchConversations(
  query: string, 
  useSemanticSearch = true,
  limit = 10
): Promise<TelegramConversation[]> {
  try {
    let embedding: number[] | undefined;
    
    if (useSemanticSearch) {
      try {
        embedding = await generateEmbedding(query);
      } catch (error) {
        console.warn('Failed to generate embedding, falling back to text search:', error);
        useSemanticSearch = false;
      }
    }

    const { data, error } = await supabase.rpc('search_conversations', {
      query_text: query,
      query_embedding: embedding,
      limit_count: limit,
      similarity_threshold: 0.7,
    });

    if (error) {
      console.error('Search error:', error);
      throw error;
    }

    // Get full conversation records
    if (!data || data.length === 0) {
      return [];
    }

    const conversationIds = data.map((item: any) => item.id);
    const { data: conversations, error: fetchError } = await supabase
      .from('telegram_conversations')
      .select('*')
      .in('id', conversationIds);

    if (fetchError) {
      throw fetchError;
    }

    return conversations || [];
  } catch (error) {
    console.error('Error searching conversations:', error);
    throw error;
  }
}

// Deal search with semantic capabilities
export async function searchDeals(
  query: string,
  useSemanticSearch = true, 
  limit = 10
): Promise<Deal[]> {
  try {
    let embedding: number[] | undefined;
    
    if (useSemanticSearch) {
      try {
        embedding = await generateEmbedding(query);
      } catch (error) {
        console.warn('Failed to generate embedding, falling back to text search:', error);
        useSemanticSearch = false;
      }
    }

    const { data, error } = await supabase.rpc('search_deals', {
      query_text: query,
      query_embedding: embedding,
      limit_count: limit,
      similarity_threshold: 0.7,
    });

    if (error) {
      console.error('Search error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    const dealIds = data.map((item: any) => item.id);
    const { data: deals, error: fetchError } = await supabase
      .from('deals')
      .select('*')
      .in('id', dealIds);

    if (fetchError) {
      throw fetchError;
    }

    return deals || [];
  } catch (error) {
    console.error('Error searching deals:', error);
    throw error;
  }
}

// Real-time subscriptions (Supabase feature)
export function subscribeToConversations(callback: (payload: any) => void) {
  return supabase
    .channel('telegram_conversations_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'telegram_conversations',
      },
      callback
    )
    .subscribe();
}

export function subscribeToDeals(callback: (payload: any) => void) {
  return supabase
    .channel('deals_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public', 
        table: 'deals',
      },
      callback
    )
    .subscribe();
}

export function subscribeToCrmTasks(callback: (payload: any) => void) {
  return supabase
    .channel('tasks_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
      },
      callback
    )
    .subscribe();
}

// Health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('business_metrics')
      .select('date')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// Initialize database if needed
export async function initializeDatabase(): Promise<void> {
  try {
    // Check if tables exist by trying to query business metrics
    const { error } = await supabase
      .from('business_metrics')
      .select('date')
      .limit(1);

    if (error && error.message.includes('does not exist')) {
      console.log('Database tables not found. Please run the database schema script.');
      throw new Error('Database not initialized. Run database-schema.sql first.');
    }
  } catch (error) {
    console.error('Database initialization check failed:', error);
    throw error;
  }
}