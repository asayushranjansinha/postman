"use client";

import { useUpdateRequestHeadersMutation } from "@/features/request/mutations";
import { RequestKeyValuesEditor } from "@/components/shared/RequestKeyValuesEditor";
import { RequestHeader } from "@prisma/client";
import { toast } from "sonner";

interface RequestHeadersEditorProps {
  requestId: string;
  initialHeaders: RequestHeader[];
}

export const RequestHeadersEditor = ({
  requestId,
  initialHeaders,
}: RequestHeadersEditorProps) => {
  const mappedData = initialHeaders.map((header) => ({
    key: header.key,
    value: header.value,
    enabled: true,
  }));

  const mutation = useUpdateRequestHeadersMutation(requestId);

  const handleSubmit = (newData: { key: string; value: string }[]) => {
    mutation.mutate(newData, {
      onError(error: any) {
        toast("Failed to update headers", {
          description: error?.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <RequestKeyValuesEditor
      title="Headers"
      initialData={mappedData}
      onSubmit={handleSubmit}
    />
  );
};
