"use client";

import React from "react";
import { toast } from "sonner";

import { useUpdateRequestBodyMutation } from "../../mutations";
import { CodeContentEditor, ContentEditorFormData } from "./CodeContentEditor";

interface RequestBodyEditorProps {
  requestId: string;
  initialBody?: string;
  initialContentType?: "application/json" | "text/plain";
  disabled?: boolean;
}

export const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestId,
  initialBody = "",
  initialContentType = "application/json",
  disabled = false,
}) => {
  const mutation = useUpdateRequestBodyMutation(requestId);

  const handleSave = (data: ContentEditorFormData) => {
    let payloadBody = data.body ?? "";

    if (data.contentType === "application/json") {
      // FIX: Allow saving empty or whitespace-only body as valid JSON content (usually means no body)
      if (payloadBody.trim() === "") {
        // If the content is empty, we allow saving it.
        // We can optionally set it to "{}" if the API strictly requires JSON,
        // but for a clear/empty state, passing the empty string is fine.
        payloadBody = "";
      } else {
        try {
          // Attempt to parse and stringify to minify/validate non-empty JSON
          payloadBody = JSON.stringify(JSON.parse(payloadBody));
        } catch {
          // Invalid JSON, don't send
          toast.error("Invalid JSON. Please fix it before saving.");
          return;
        }
      }
    }

    mutation.mutate(payloadBody, {
      onError(error) {
        toast("Failed to update body", {
          description: error?.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <CodeContentEditor
      initialContent={initialBody}
      initialContentType={initialContentType}
      onSave={handleSave}
      disabled={disabled}
    />
  );
};
