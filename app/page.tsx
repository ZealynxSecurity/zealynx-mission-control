import { Layout } from '@/components/Layout';
import { OverviewDashboard } from '@/components/OverviewDashboard';

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="heading-xl text-gradient-zealynx">
            Overview
          </h1>
          <p className="subheading">
            Business intelligence dashboard with real-time monitoring across all operations
          </p>
        </div>
        <OverviewDashboard />
      </div>
    </Layout>
  );
}