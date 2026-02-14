import { Layout } from '@/components/Layout';
import { TelegramDashboard } from '@/components/TelegramDashboard';

export default function TelegramPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="heading-xl zealynx-gradient-text">
              Telegram Management
            </h1>
            <p className="subheading">
              Real-time monitoring and AI-powered categorization of 195+ business conversations
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">
              🔄 Refresh
            </button>
            <button className="btn btn-secondary btn-sm">
              📊 Analytics
            </button>
          </div>
        </div>
        <TelegramDashboard />
      </div>
    </Layout>
  );
}