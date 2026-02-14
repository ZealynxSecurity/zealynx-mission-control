import { PageLayout } from '@/components/Navigation';
import { OverviewDashboard } from '@/components/OverviewDashboard';

export default function HomePage() {
  return (
    <PageLayout
      title="Overview"
      subtitle="Business intelligence dashboard with real-time monitoring across all operations"
    >
      <OverviewDashboard />
    </PageLayout>
  );
}