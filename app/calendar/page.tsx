import { PageLayout } from '@/components/Navigation';
import { CalendarDashboard } from '@/components/CalendarDashboard';

export default function CalendarPage() {
  return (
    <PageLayout
      title="Calendar & Crons"
      subtitle="Schedule management and automation monitoring with intelligent task scheduling"
      actions={
        <div className="flex gap-2">
          <button className="btn btn-primary text-xs sm:text-sm">
            📅 Add Event
          </button>
          <button className="btn btn-secondary text-xs sm:text-sm">
            ⚙️ Manage Crons
          </button>
        </div>
      }
    >
      <CalendarDashboard />
    </PageLayout>
  );
}