"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AlgorithmCard({
  title,
  description,
  icon,
  children,
  className,
  headerBadge
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  headerBadge?: ReactNode;
}) {
  return (
    <Card className={cn("h-full border backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            {headerBadge}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}