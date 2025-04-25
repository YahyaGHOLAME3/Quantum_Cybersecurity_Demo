"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Shield, ShieldAlert, Lock, ExternalLink, Home, Info } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold text-primary">
            Quantum-Safe Vault
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </div>
          </Link>
          <Link
            href="/demo"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/demo" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span>Demo</span>
            </div>
          </Link>
          <Link
            href="/learn"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/learn" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>Learn</span>
            </div>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}