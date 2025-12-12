"use client";
import { FolderOpenIcon, PencilIcon, TerminalIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface RequestPlaygroundEmptyStateProps {
  onNewRequest: () => void;
}

export const RequestPlaygroundEmptyState = ({
  onNewRequest,
}: RequestPlaygroundEmptyStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--primary-rgb), 0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center max-w-md w-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150" />
          <Image src="/logo.svg" height={100} width={100} alt="Empty State" />
        </div>

        <h3 className="text-2xl font-bold mb-3 text-foreground text-center">
          Ready to Create a Request?
        </h3>

        <p className="text-muted-foreground text-center mb-8 leading-relaxed">
          Get started by opening a saved request from the sidebar or creating a
          new one to begin testing your APIs.
        </p>

        <Button onClick={onNewRequest} className="mb-6 px-6 py-3 h-auto">
          <PencilIcon className="w-4 h-4 mr-2" />
          Create New Request
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Quick Start:</span>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs font-mono bg-secondary border border-border rounded text-foreground">
              Ctrl
            </kbd>
            <span className="text-muted-foreground/80">+</span>
            <kbd className="px-2 py-1 text-xs font-mono bg-secondary border border-border rounded text-foreground">
              Shift
            </kbd>
            <span className="text-muted-foreground/80">+</span>
            <kbd className="px-2 py-1 text-xs font-mono bg-secondary border border-border rounded text-foreground">
              N
            </kbd>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FolderOpenIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Open Saved</p>
              <p className="text-xs text-muted-foreground">From sidebar</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <TerminalIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Import cURL</p>
              <p className="text-xs text-muted-foreground">Paste command</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
