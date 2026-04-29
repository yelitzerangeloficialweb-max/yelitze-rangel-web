import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F9F8F6]">
            {/* Sidebar Navigation */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                <main className="flex-grow p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
                    {children}
                </main>

                {/* Optional Footer inside content area */}
                <footer className="p-8 text-center text-[10px] text-stone-400 uppercase tracking-widest border-t border-stone-200/50">
                    &copy; {new Date().getFullYear()} Yelitze Rangel • Gestión Profesional
                </footer>
            </div>
        </div>
    );
}
