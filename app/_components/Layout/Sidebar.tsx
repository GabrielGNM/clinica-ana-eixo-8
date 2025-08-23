"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  ClipboardCheck,
  CreditCard,
  Settings,
  Menu,
  User,
  Home,
  Ambulance,
} from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Painel Inicial", href: "/dashboard", icon: Home },
  { name: "Agendamento", href: "/schedules", icon: Calendar },
  { name: "Atendimento", href: "/services", icon: ClipboardCheck },
  { name: "Pacientes", href: "/patients", icon: Users },
  { name: "Faturamento", href: "/billing", icon: CreditCard },
  { name: "Profissionais", href: "/professionals", icon: User },
  { name: "Configurações", href: "/configuration", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 h-screen transition-all duration-300 shadow-md",
        collapsed ? "w-20" : "w-64",
        "flex flex-col"
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-zinc-800">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
              <Ambulance size={24} className="text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-800 dark:text-white tracking-tight">
              MedHora
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    collapsed ? "justify-center" : "",
                    isActive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-all",
                      collapsed ? "" : "mr-3",
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-500 dark:text-zinc-400"
                    )}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
