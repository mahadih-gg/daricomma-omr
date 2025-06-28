import DashboardLayout from '../../layouts/DashboardLayout';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 