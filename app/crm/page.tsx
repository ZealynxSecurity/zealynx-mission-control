import { PageLayout } from '@/components/Navigation';
import { CrmDashboard } from '@/components/CrmDashboard';

export default function CrmPage() {
  return (
    <PageLayout
      title="CRM Pipeline"
      subtitle="Smart deal management with 52 qualified deals and autonomous pipeline actions"
      actions={
        <div className="flex gap-2">
          <button className="btn btn-primary text-xs sm:text-sm">
            ➕ New Deal
          </button>
          <button className="btn btn-secondary text-xs sm:text-sm">
            📊 Reports
          </button>
        </div>
      }
    >
      <CrmDashboard />
    </PageLayout>
  );
}