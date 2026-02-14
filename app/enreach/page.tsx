import { Layout } from '@/components/Layout';
import { EnreachDashboard } from '@/components/EnreachDashboard';

export default function EnreachPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="heading-xl text-gradient-zealynx">
              Enreach Dashboard
            </h1>
            <p className="subheading">
              AI-powered lead generation campaigns with 9 agents across Telegram, LinkedIn, and Email
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">
              📊 Analytics
            </button>
            <button className="btn btn-secondary btn-sm">
              ⚙️ Settings
            </button>
          </div>
        </div>
        <EnreachDashboard />
      </div>
    </Layout>
  );
}