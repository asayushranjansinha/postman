"use client";

import { toast } from "sonner";

import { Modal } from "@/components/shared/Modal";
import {
  RequestForm,
  RequestFormValues,
} from "@/features/request/components/forms/RequestForm";
import { useUpdateRequestMutation } from "@/features/request/mutations"; // Assume this mutation hook exists

interface UpdateRequestData extends RequestFormValues {
  id: string; // The ID of the request to update
}

interface UpdateRequestModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  initialData: UpdateRequestData;
}

export const UpdateRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  initialData,
}: UpdateRequestModalProps) => {
  const { id: requestId, ...initialFormValues } = initialData;

  // Assume a mutation hook for updating an existing request by ID
  const updateRequest = useUpdateRequestMutation();

  const handleUpdateRequest = (formValues: RequestFormValues) => {
    // Check if the form values are the same as the initial values
    // Note: You might need a more robust deep equality check here for complex objects,
    // but for name, url, and method, a simple check suffices.
    const isSame =
      formValues.name === initialFormValues.name &&
      formValues.url === initialFormValues.url &&
      formValues.method === initialFormValues.method;

    if (isSame) {
      toast.info("No change detected", {
        description: "The request details are the same as before.",
      });
      setIsModalOpen(false);
      return;
    }

    updateRequest.mutate(
      {
        id: requestId,
        name: formValues.name,
        url: formValues.url!,
        method: formValues.method,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to update request", {
              description: data.message,
            });
          } else {
            toast.success(
              `Request "${data.data.name}" (${data.data.method}) updated`,
              {
                description: "Details update complete.",
              }
            );
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleUpdateRequest] Failed to update request:",
            error
          );
          toast.error("Failed to update request", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Update Request"
      description={`Edit the details for request "${initialData.name}" in collection "${initialFormValues.name}"`}
      isOpen={isModalOpen}
      onClose={handleCancel}
      className="max-w-md"
    >
      {/* Pass the initial form values derived from initialData */}
      <RequestForm
        initialData={initialData}
        onSubmit={handleUpdateRequest}
        onCancel={handleCancel}
        isSubmitting={updateRequest.isPending}
      />
    </Modal>
  );
};
