import { PrismaRequestRun } from "@/features/request/types";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import React from "react";

interface LiveDemoResponseViewerProps {
  result: PrismaRequestRun | null;
  executionError: string | null;
  isRunning: boolean;
}

export const LiveDemoResponseViewer = ({
  result,
  executionError,
  isRunning,
}: LiveDemoResponseViewerProps) => {
  // Loading State
  if (isRunning) {
    return (
      <div className="flex items-center justify-center text-primary">
        <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin mr-3" />
        <p className="font-semibold">Awaiting API Response...</p>
      </div>
    );
  }

  // Error State
  if (executionError) {
    return (
      <div className="text-destructive p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm mb-1">Execution Error</p>
          <p className="text-xs">{executionError}</p>
        </div>
      </div>
    );
  }

  // Successful Result State
  if (result) {
    const isSuccess = result.status && result.status >= 200 && result.status < 400;
    const statusText =
      result.status && result.status >= 200 && result.status < 300
        ? "OK"
        : result.status && result.status >= 400
        ? "Client Error"
        : "Server Error";

    return (
      <div className="space-y-4">
        {/* Status & Time */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-accent" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive-foreground" />
            )}
            <span
              className={`${
                isSuccess ? "text-accent" : "text-destructive-foreground"
              } font-mono font-medium`}
            >
              {result.status} {statusText}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {result.durationMs}ms
            </span>
          </div>
        </div>

        {/* Response Body */}
        <div className="rounded-lg bg-background border border-border p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground max-h-60 whitespace-pre-wrap">
            {result.body ? result.body : "No response body received."}
          </pre>
        </div>
      </div>
    );
  }

  // Initial State
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <p>Click "Send Request" to test an API endpoint</p>
    </div>
  );
};