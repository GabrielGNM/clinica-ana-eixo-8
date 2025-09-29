import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  ClipboardCheck,
  CreditCard,
  Settings,
  Menu,
  User,
  Home,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"; // Import the image

const navItems = [
  {
    name: "Painel Inicial",
    href: "/",
    icon: Home,
  },
  {
    name: "Agendamento",
    href: "/agendamento",
    icon: Calendar,
  },
  {
    name: "Atendimento",
    href: "/atendimento",
    icon: ClipboardCheck,
  },
  {
    name: "Pacientes",
    href: "/pacientes",
    icon: Users,
  },
  {
    name: "Documentos",
    href: "/documentos",
    icon: FileText,
  },
  {
    name: "Faturamento",
    href: "/faturamento",
    icon: CreditCard,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-gray-200 h-16">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-clinic-teal flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">neurohabiliTo</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed ? "mx-auto" : "ml-auto")}
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="p-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-muted",
                  collapsed ? "justify-center px-2" : "px-3",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(collapsed ? "mx-0" : "mr-2")}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
