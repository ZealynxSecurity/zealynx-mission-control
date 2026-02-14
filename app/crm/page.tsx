import { Layout } from '@/components/Layout';
import { CrmDashboard } from '@/components/CrmDashboard';

export default function CrmPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="heading-xl text-gradient-zealynx">
              CRM Pipeline
            </h1>
            <p className="subheading">
              Smart deal management with 52 qualified deals and autonomous pipeline actions
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">
              ➕ New Deal
            </button>
            <button className="btn btn-secondary btn-sm">
              📊 Reports
            </button>
          </div>
        </div>
        <CrmDashboard />
      </div>
    </Layout>
  );
}