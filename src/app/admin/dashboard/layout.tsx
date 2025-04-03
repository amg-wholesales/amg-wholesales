// app/dashboard/layout.js
import Sidebar from '../_components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 transition-all p-8 sm:ml-64">
        {children}
      </main>
    </div>
  );
}