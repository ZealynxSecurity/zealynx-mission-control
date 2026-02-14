import { PageLayout } from '@/components/Navigation';
import { TelegramDashboard } from '@/components/TelegramDashboard';

export default function TelegramPage() {
  return (
    <PageLayout
      title="Telegram Management"
      subtitle="Real-time monitoring and AI-powered categorization of 195+ business conversations"
      actions={
        <div className="flex gap-2">
          <button className="btn btn-primary text-xs sm:text-sm">
            🔄 Refresh
          </button>
          <button className="btn btn-secondary text-xs sm:text-sm">
            📊 Analytics
          </button>
        </div>
      }
    >
      <TelegramDashboard />
    </PageLayout>
  );
}