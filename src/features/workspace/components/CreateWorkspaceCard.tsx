// CreateWorkspaceCard.tsx (Fixed)
"use client";

import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CreateWorkspaceCard({ onCreate }: { onCreate: () => void }) {
  return (
    <Card
      className="group relative overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 p-0"
      onClick={onCreate}
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

      <CardHeader className="relative p-4 flex flex-col items-center justify-center pt-8 pb-3">
        {/* Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-dashed border-primary/50">
          <PlusCircleIcon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
        </div>

        <CardTitle className="text-lg font-semibold text-center text-primary/90">
          Create New Workspace
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground/80">
          Start a new project from scratch
        </CardDescription>
      </CardHeader>

      <CardContent className="relative p-4 pt-0 w-full flex flex-col flex-1 justify-end">
        {/* Action Button - Mimics the style of the other card but uses a lighter accent */}
        <Button
          onClick={onCreate}
          className="w-full h-9 text-sm border-primary/30 text-primary-foreground/90 bg-primary/70 hover:bg-primary"
          variant="default" // Using default but overriding colors for visual differentiation
        >
          Create
        </Button>
      </CardContent>
    </Card>
  );
}
