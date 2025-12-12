"use client";

import { useState, useCallback, useEffect } from "react";

import { ExecutionDetails, PrismaRequestRun } from "@/features/request/types";
import { useExecutePublicRequestMutation } from "@/features/request/mutations";

import { LiveDemoHeader } from "./LiveDemoHeader";
import { LiveDemoRequestBuilder } from "./LiveDemoRequestBuilder";
import { LiveDemoResponseViewer } from "./LiveDemoResponseViewer";
import { LiveDemoLimitOverlay } from "./LiveDemoLimitOverlay";
import { HttpMethod } from "@prisma/client";

// The type definitions and helpers remain here for tight coupling
const methods = Object.keys(HttpMethod);
type Method = (typeof methods)[number];

const MAX_PUBLIC_REQUESTS = 3;
const REQUEST_COUNT_KEY = "pulseapi_public_request_count";

function getPublicRequestCount(): number {
  if (typeof window === "undefined") return 0;
  const count = localStorage.getItem(REQUEST_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
}

function incrementPublicRequestCount() {
  if (typeof window === "undefined") return;
  const currentCount = getPublicRequestCount();
  localStorage.setItem(REQUEST_COUNT_KEY, (currentCount + 1).toString());
}

export function LiveDemo() {
  const [selectedMethod, setSelectedMethod] = useState<Method>("GET");
  const [fullUrl, setFullUrl] = useState<string>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  const [result, setResult] = useState<PrismaRequestRun | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);

  const publicRequestMutation = useExecutePublicRequestMutation();

  useEffect(() => {
    setRequestCount(getPublicRequestCount());
  }, []);

  const isLimitReached = requestCount > MAX_PUBLIC_REQUESTS;
  const isRunning = publicRequestMutation.isPending;

  const runTest = useCallback(() => {
    if (isRunning || isLimitReached) return;

    setResult(null);
    setExecutionError(null);

    const urlString = fullUrl.trim();
    if (!urlString || !urlString.startsWith("http")) {
      setExecutionError(
        "Please enter a valid URL starting with http:// or https://"
      );
      return;
    }

    const executionDetails: ExecutionDetails = {
      url: urlString,
      method: selectedMethod as HttpMethod,
      body:
        selectedMethod === "POST" || selectedMethod === "PUT"
          ? JSON.stringify({ title: "foo", body: "bar", userId: 1 })
          : null,
      headers:
        selectedMethod === "POST" || selectedMethod === "PUT"
          ? [{ key: "Content-Type", value: "application/json" }]
          : [],
      queryParams: [],
    };

    publicRequestMutation.mutate(executionDetails, {
      onSuccess: (response) => {
        if (response.success && response.data) {
          setResult(response.data);
          incrementPublicRequestCount();
          setRequestCount(getPublicRequestCount());

          if (response.data.error) {
            setExecutionError(response.data.error);
          }
        } else {
          setExecutionError(response.message || "Failed to execute request.");
        }
      },
      onError: (error) => {
        setExecutionError(`Client Error: ${error.message}`);
      },
    });
  }, [
    fullUrl,
    selectedMethod,
    isRunning,
    isLimitReached,
    publicRequestMutation,
  ]);

  const requestsRemaining = MAX_PUBLIC_REQUESTS - requestCount;

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <LiveDemoHeader requestsRemaining={requestsRemaining} />

        {/* Demo Interface Container */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl relative">
          {/* Limit Reached Overlay */}
          {isLimitReached && (
            <LiveDemoLimitOverlay maxRequests={MAX_PUBLIC_REQUESTS} />
          )}

          {/* Request Builder */}
          <LiveDemoRequestBuilder
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            fullUrl={fullUrl}
            setFullUrl={setFullUrl}
            runTest={runTest}
            isLimitReached={isLimitReached}
            isRunning={isRunning}
          />

          {/* Response Viewer */}
          <div className="p-6 bg-secondary/20 min-h-[45vh] flex flex-col justify-center">
            <LiveDemoResponseViewer
              result={result}
              executionError={executionError}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
