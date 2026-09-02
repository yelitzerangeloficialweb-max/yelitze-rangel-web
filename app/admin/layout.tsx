import type { Metadata } from 'next';
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell';

export const metadata: Metadata = {
    title: 'Panel de Administración | Yelitze Rangel',
    robots: {
        index: false,
        follow: false,
    }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
