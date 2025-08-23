"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Bell, Moon, Search, Sun, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { executeAction } from "@/app/_lib/executeAction";
import { cn } from "@/app/_lib/utils";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await executeAction({
      actionFn: () => signOut({ callbackUrl: "/" }),
      successMessage: "Sessão encerrada com sucesso!",
    });
  };

  return (
    <header
      className={cn(
        "h-16 border-b flex items-center justify-between px-6 z-50 transition-colors",
        "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-sm"
      )}
    >
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/30 border border-border text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-4">
        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/40 dark:hover:bg-muted rounded-full transition"
        >
          <Bell size={20} className="text-muted-foreground" />
          {notifications > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-destructive text-white text-[10px] font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow">
              {notifications}
            </span>
          )}
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted/40 dark:hover:bg-muted rounded-full transition"
            >
              <User size={20} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-xl bg-popover dark:bg-zinc-800 shadow-lg border border-border"
          >
            <DropdownMenuLabel className="text-foreground">Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/configuration">Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-muted/40 dark:hover:bg-muted rounded-full transition"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-muted-foreground" />
            ) : (
              <Moon size={18} className="text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
