import { Layout } from '@/components/Layout';
import { CalendarDashboard } from '@/components/CalendarDashboard';

export default function CalendarPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="heading-xl zealynx-gradient-text">
              Calendar & Crons
            </h1>
            <p className="subheading">
              Schedule management and automation monitoring with intelligent task scheduling
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">
              📅 Add Event
            </button>
            <button className="btn btn-secondary btn-sm">
              ⚙️ Manage Crons
            </button>
          </div>
        </div>
        <CalendarDashboard />
      </div>
    </Layout>
  );
}