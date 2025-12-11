"use client";

import { useUpdateRequestQueryParamsMutation } from "@/features/request/mutations";
import { RequestKeyValuesEditor } from "@/components/shared/RequestKeyValuesEditor";
import { RequestQueryParam } from "@prisma/client";
import { toast } from "sonner";

interface RequestQueryParamsEditorProps {
  requestId: string;
  initialQueryParams: RequestQueryParam[];
}

export const RequestQueryParamsEditor = ({
  requestId,
  initialQueryParams,
}: RequestQueryParamsEditorProps) => {
  const mappedData = initialQueryParams.map((item) => ({
    key: item.key,
    value: item.value,
    enabled: true,
  }));

  const mutation = useUpdateRequestQueryParamsMutation(requestId);

  const handleSubmit = (newData: { key: string; value: string }[]) => {
    mutation.mutate(newData, {
      onError(error) {
        toast("Failed to update query parameters", {
          description: error?.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <RequestKeyValuesEditor
      title="Query Parameters"
      initialData={mappedData}
      onSubmit={handleSubmit}
    />
  );
};
