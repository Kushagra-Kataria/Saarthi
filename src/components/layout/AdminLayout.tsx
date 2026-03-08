import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, List, Map, AlertTriangle, Building2, FileBarChart, Settings, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'All Complaints', path: '/admin/complaints', icon: List },
  { label: 'Heatmap', path: '/admin/heatmap', icon: Map },
  { label: 'Crisis Alerts', path: '/admin/crisis', icon: AlertTriangle },
  { label: 'Departments', path: '/admin/departments', icon: Building2 },
  { label: 'Reports', path: '/admin/reports', icon: FileBarChart },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-sidebar-primary" />
              <span className="text-sm font-semibold text-sidebar-foreground">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map(item => {
            const isActive = location.pathname === item.path ||
              (item.path === '/admin' && location.pathname === '/admin');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
