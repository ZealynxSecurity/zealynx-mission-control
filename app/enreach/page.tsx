import { PageLayout } from '@/components/Navigation';
import { EnreachDashboard } from '@/components/EnreachDashboard';

export default function EnreachPage() {
  return (
    <PageLayout
      title="Enreach Dashboard"
      subtitle="AI-powered lead generation campaigns with 9 agents across Telegram, LinkedIn, and Email"
      actions={
        <div className="flex gap-2">
          <button className="btn btn-primary text-xs sm:text-sm">
            📊 Analytics
          </button>
          <button className="btn btn-secondary text-xs sm:text-sm">
            ⚙️ Settings
          </button>
        </div>
      }
    >
      <EnreachDashboard />
    </PageLayout>
  );
}